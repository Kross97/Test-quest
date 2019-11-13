import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
      <span onClick={this.changeTypeSort('number')} onKeyPress tabIndex={0} role="button" className="sort-block-number">
        <span className="sort-label">
        Номер
        </span>
        <img src={`../images/${currentSort === 'number' ? 'sort2' : 'sort'}.png`} alt="sort" width="10" height="10" />
      </span>
      <span onClick={this.changeTypeSort('data')} onKeyPress tabIndex={0} role="button" className="sort-block">
        <span className="sort-label">
            Создано
        </span>
        <img src={`../images/${currentSort === 'data' ? 'sort2' : 'sort'}.png`} alt="sort" width="10" height="10" />
      </span>
      <span onClick={this.changeTypeSort('text')} onKeyPress tabIndex={0} role="button" className="sort-block">
        <span className="sort-text">
              Обьявление
        </span>
        <img src={`../images/${currentSort === 'text' ? 'sort2' : 'sort'}.png`} alt="sort" width="10" height="10" />
      </span>
      <span onClick={this.changeTypeSort('rating')} onKeyPress tabIndex={0} role="button" className="sort-block-rating">
        <span className="sort-rating">
                Рейтинг
        </span>
        <img src={`../images/${currentSort === 'rating' ? 'sort2' : 'sort'}.png`} alt="sort" width="10" height="10" />
      </span>
      <span onClick={this.changeTypeSort('user')} onKeyPress tabIndex={0} role="button" className="sort-block-user">
        <span className="sort-label">
                  Пользователь
        </span>
        <img src={`../images/${currentSort === 'user' ? 'sort2' : 'sort'}.png`} alt="sort" width="10" height="10" />
      </span>
    </div>
  );
}
}

export default connect(mapProps, allActions)(NavigationSort);
