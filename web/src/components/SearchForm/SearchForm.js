import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchForm.css';

import arrowUp from './angle-up-solid.svg';
import arrowDown from './angle-down-solid.svg';

const orderingStateMachine = {
  none: 'up',
  up: 'down',
  down: 'none',
};

const normalizeOrdering = {
  up: 'asc',
  down: 'desc',
};

class SearchForm extends React.Component {
  static propTypes = {
    onTriggerSearch: PropTypes.func.isRequired,
    onEmptyEntries: PropTypes.func,
  };

  static defaultProps = {
    onEmptyEntries: () => {},
  };

  constructor() {
    super();
    this.state = {
      query: '',
      order: {
        price: 'none',
        name: 'none',
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    this.triggerSearch(event.target.value);
  }

  triggerSearch(query) {
    let queryString;

    this.setState({ query });

    if (query.length > 3) {
      queryString = `query=${query}`;

      if (this.state.order.price !== 'none') {
        queryString += `&order[price]=${
          normalizeOrdering[this.state.order.price]
        }`;
      }

      if (this.state.order.name !== 'none') {
        queryString += `&order[name]=${
          normalizeOrdering[this.state.order.name]
        }`;
      }

      this.props.onTriggerSearch(queryString);
      return;
    }

    if (!query.length && this.props.onEmptyEntries) {
      this.props.onEmptyEntries();
    }
  }

  renderOrderingIndicator(indicator) {
    return (
      <i className={s.searchOptionsOrdering}>
        {indicator === 'up' ? (
          <img src={arrowUp} alt={`Sorting ${indicator}`} width="12" />
        ) : null}
        {indicator === 'down' ? (
          <img src={arrowDown} alt={`Sorting ${indicator}`} width="12" />
        ) : null}
      </i>
    );
  }

  render() {
    return (
      <div className={s.searchFormContainer}>
        <div className={s.searchTermInputContainer}>
          <input
            className={s.searchTermInput}
            placeholder="Search by name or region"
            name="searchTerm"
            onChange={this.handleInputChange}
            value={this.state.value}
          />
        </div>
        <div className={s.searchOptions}>
          <h3>Sort results:</h3>
          <span
            className={s.searchOrdering}
            onClick={() => {
              this.setState({
                order: {
                  name: orderingStateMachine[this.state.order.name],
                  price: this.state.order.price,
                },
              });
              this.triggerSearch(this.state.query);
            }}
          >
            by Name
            {this.renderOrderingIndicator(this.state.order.name)}
          </span>
          <span className={s.spacer}>·</span>
          <span
            className={s.searchOrdering}
            onClick={() => {
              this.setState({
                order: {
                  price: orderingStateMachine[this.state.order.price],
                  name: this.state.order.name,
                },
              });
              this.triggerSearch(this.state.query);
            }}
          >
            by Price
            {this.renderOrderingIndicator(this.state.order.price)}
          </span>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchForm);
