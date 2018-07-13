import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchEntry.css';

class SearchEntry extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    producer: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.searchEntryContainer}>
        <div className={s.searchEntryImg}>
          <img src={this.props.imgUrl} height="150" alt="Entry's product" />
        </div>
        <div className={s.searchEntryInfo}>
          <h2 className={s.searchEntryName}>{this.props.name}</h2>
          <p className={s.searchEntryTxt}>Producer: {this.props.producer}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchEntry);
