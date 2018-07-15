require 'net/http'
require 'uri'
require 'json'
require 'date'
require 'bigdecimal'

class VerveSearchService
  class << self
    def verve_search_uri=(url)
      @verve_search_uri = url
    end

    def verve_search_uri
      @verve_search_uri || ''
    end

    def attempt_entries_update
      self.new.fetch_and_update_entries
    end
  end

  def fetch_and_update_entries
    lastupdate = DateTime.now
    lastupdated_entry = Entry.order_by(last_update: :desc).limit(1).first
    unless lastupdated_entry.nil?
      elapsed_minutes = ((lastupdate - lastupdated_entry.last_update) * 60 * 60).to_i
      return if elapsed_minutes < 15
    end

    external_entries = begin
      canonical_fetch
    rescue
      Array.new
    end

    if external_entries.length > 0
      external_entries.each do |external_entry|
        external_entry.symbolize_keys!
        internal_entry = external_entry
          .slice(
            :name, :price_in_usd, :producer, :region, :country, :location,
            :appellation, :vintage, :bottle_size, :quantity, :link, :image_url
          )
          .merge(
            external_id: external_entry[:id],
            last_update: lastupdate
          )
        entry = Entry.where(external_id: external_entry[:id]).first
        if entry.nil?
          Entry.create(internal_entry)
        else
          entry.upsert(internal_entry)
        end
      end
    end
  end

  def canonical_fetch
    path = URI('/v1/feeds/banquet_feed.json')
    path.query = URI.encode_www_form({store_id: '1'})
    request = Net::HTTP::Get.new(path.to_s)
    request.add_field('Accept', 'application/json')
    begin
      response = remote_connection.request(request)
    rescue Timeout::Error => e
      return {'error' => 'timeout'}
    end
    parse_body(response.body)
  end

  private

  def remote_connection
    uri = URI.parse(self.class.verve_search_uri)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http
  end

  def parse_body(body)
    begin
      body = JSON.parse(body)
      return body
    rescue Exception => e
      return {'error' => 'parsing_error'}
    end
  end
end
