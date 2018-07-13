import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

import SearchEntry from '../../components/SearchEntry';
import SearchForm from '../../components/SearchForm';

class Home extends React.Component {
  static contextTypes = { fetch: PropTypes.func.isRequired };

  constructor() {
    super();
    this.state = {
      entries: [],
    };
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1 className={s.pageTitle}>Search Verve wines</h1>
          <SearchForm
            onTriggerSearch={queryString =>
              this.context
                .fetch(`/search/index?${queryString}`, { method: 'GET' })
                .then(response => response.json())
                .then(entries => this.setState({ entries }))
            }
            onEmptyEntries={() => this.setState({ entries: [] })}
          />
          {this.state.entries.map(item => (
            <SearchEntry
              key={item.external_id}
              name={item.name}
              producer={item.producer}
              price={item.price_in_usd}
              imgUrl={item.image_url}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
