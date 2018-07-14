require 'date'
require 'bigdecimal'

class Entry
  include Mongoid::Document
  store_in collection: "verve_entries"

  field :external_id, type: Integer
  field :name, type: String
  field :producer, type: String
  field :price_in_usd, type: BigDecimal
  field :region, type: String
  field :country, type: String
  field :location, type: String
  field :appellation, type: String
  field :vintage, type: String
  field :bottle_size, type: String
  field :quantity, type: Integer
  field :link, type: String
  field :image_url, type: String

  field :last_update, type: DateTime
end
