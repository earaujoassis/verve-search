class SearchController < ApplicationController
  def index
    VerveSearchService.new.attempt_entries_update
    limit = params[:limit] || 10
    query = params[:query]
    order = params[:order]

    if query
      criteria = Entry
        .any_of(name: /.*#{query}.*/i)
        .any_of(region: /.*#{query}.*/i)
    else
      criteria = Entry.all
    end

    if order
      if order['price'] == 'desc' || order['price'] == 'asc'
        criteria = criteria.order_by(price: order['price'])
      end

      if order['name'] == 'desc' || order['name'] == 'asc'
        criteria = criteria.order_by(name: order['name'])
      end
    end

    render json: criteria.limit(limit)
  end
end
