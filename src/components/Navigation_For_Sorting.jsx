import React from 'react';
// import { connect } from 'react-redux';

export default class NavigationSort extends React.Component {
  render() {
    return (
      <div className="container-fluid row no-gutters">
      <span className="sort-block-number">
        <span className="sort-label">
          Номер
          </span>
          <img src="../images/sort.png" alt="sort" width="10" height="10" />
        </span>
        <span className="sort-block">
          <span className="sort-label">
            Создано
            </span>
            <img src="../images/sort.png" alt="sort" width="10" height="10" />
          </span>
        <span className="sort-block">
            <span className="sort-text">
              Обьявление
              </span>
              <img src="../images/sort.png" alt="sort" width="10" height="10" />
            </span>
            <span className="sort-block-rating">
              <span className="sort-rating">
                Рейтинг
                </span>
                <img src="../images/sort.png" alt="sort" width="10" height="10" />
              </span>
            <span className="sort-block-user">
                <span className="sort-label">
                  Пользователь
                  </span>
                  <img src="../images/sort.png" alt="sort" width="10" height="10" />
                </span>
      </div>
    );
  }
}
