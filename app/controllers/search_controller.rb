class SearchController < ApplicationController
  def index
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
      if order['price_in_usd'] == 'desc' || order['price_in_usd'] == 'asc'
        criteria = criteria.order_by(price_in_usd: order['price_in_usd'])
      end

      if order['name'] == 'desc' || order['name'] == 'asc'
        criteria = criteria.order_by(name: order['name'])
      end
    end

    render json: criteria.limit(limit).collation(locale: 'en_US', numericOrdering: true)
  end
end
