import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { sortingSpans } from './AST_buttons_span';
import { imageSortAsc, imageSortDesc } from './images_path';

const mapProps = ({ typeSort }) => ({ typeSort });

const allActions = {
  addTypeSort: actions.addTypeSort,
};

class NavigationSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSort: '' };
  }

changeTypeSort = (valueSort) => () => {
  const { addTypeSort, typeSort } = this.props;
  if (valueSort.asc === typeSort) {
    addTypeSort({ type: valueSort.desc });
    this.setState({ currentSort: '' });
  } else {
    addTypeSort({ type: valueSort.asc });
    this.setState({ currentSort: valueSort.asc });
  }
}

render() {
  const { currentSort } = this.state;
  return (
    <div className="container-fluid row no-gutters">
      {sortingSpans.map((span) => (
        <span key={span.value} role="button" className={span.blokStyle}>
          <span className={span.labelStyle}>
            {span.text}
          </span>
          <button type="button" className="btn-sorting" onClick={this.changeTypeSort(span.value)}>
            <img src={currentSort === span.value.asc ? imageSortAsc : imageSortDesc} alt="sort" width="10" height="10" />
          </button>
        </span>
      ))}
    </div>
  );
}
}

export default connect(mapProps, allActions)(NavigationSort);
