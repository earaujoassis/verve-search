VerveSearchService.verve_search_uri = 'https://staging-verve-api.herokuapp.com'

JobsService.every '15m' do
  VerveSearchService.attempt_entries_update
end
