import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { sortingSpans } from './AST_buttons_span';

const mapProps = ({ typeSort }) => ({ typeSort });

const allActions = {
  addTypeSort: actions.addTypeSort,
};

class NavigationSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentSort: '' };
  }

changeTypeSort = (type) => () => {
  const { addTypeSort, typeSort } = this.props;
  if (type === typeSort) {
    addTypeSort({ type: `${type}2` });
    this.setState({ currentSort: '' });
  } else {
    addTypeSort({ type });
    this.setState({ currentSort: type });
  }
}

render() {
  const { currentSort } = this.state;
  return (
    // без onKeyPress ругается линтер
    <div className="container-fluid row no-gutters">
      {sortingSpans.map((span) => (
        <span key={span.value} onClick={this.changeTypeSort(span.value)} onKeyPress tabIndex={0} role="button" className={span.blokStyle}>
          <span className={span.labelStyle}>
            {span.text}
          </span>
          <img src={`../images/${currentSort === span.value ? 'sort2' : 'sort'}.png`} alt="sort" width="10" height="10" />
        </span>
      ))}
    </div>
  );
}
}

export default connect(mapProps, allActions)(NavigationSort);
