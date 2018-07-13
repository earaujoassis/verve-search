class SearchController < ApplicationController
  def index
    VerveSearchService.new.attempt_entries_update
    limit = params[:limit] || 10
    query = params[:query]
    order = params[:order]

    if query
      criteria = Entry
        .any_of({name: /.*#{query}.*/i})
        .any_of({ region: /.*#{query}.*/i })
    else
      criteria = Entry.all
    end

    if order
      puts order.inspect
      criteria = criteria.desc(:name) if order['name'] = 'desc'
      criteria = criteria.asc(:name) if order['name'] = 'asc'
      criteria = criteria.desc(:price) if order['price'] = 'desc'
      criteria = criteria.asc(:price) if order['price'] = 'asc'
    end

    render json: criteria.limit(limit)
  end
end
