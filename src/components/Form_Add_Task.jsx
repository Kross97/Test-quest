import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import valid from 'validator';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import Select from './Select_Users';

const mapProps = ({ users, dataChannel }) => {
  const { currentId } = dataChannel;
  const props = { users, currentId };
  return props;
};


const allActions = {
  addTask: actions.addTask,
  addAlert: actions.addAlert,
};

class FormAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notValid: true,
      number: '0',
      date: '',
      user: 'Все',
      text: '',
      rating: '0',
    };
  }

  resetTask = () => {
    this.setState({
      number: '0',
      date: '',
      user: 'Все',
      text: '',
      rating: '0',
    });
  }

submitTask = (e) => {
  e.preventDefault();
  const { addTask, currentId, addAlert } = this.props;
  const {
    number,
    date,
    user,
    text,
    rating,
  } = this.state;
  const task = {
    id: _.uniqueId(),
    currentId,
    number,
    date,
    user,
    text,
    rating,
  };
  addTask({ task });
  const alert = { id: _.uniqueId(), type: 'add_task', message: 'Задача успешно создана!' };
  addAlert({ alert });
  this.resetTask();
  this.setState({ notValid: true });
};

changeDataTask = (type) => ({ target }) => {
  switch (type) {
    case 'number':
      this.setState({ number: target.value });
      break;
    case 'date':
      this.setState({ date: target.value });
      break;
    case 'user':
      this.setState({ user: target.value });
      break;
    case 'text':
      this.setState({ text: target.value });
      break;
    case 'rating':
      this.setState({ rating: target.value });
      break;
    default:
  }
}

/* eslint class-methods-use-this: ["error", {
"exceptMethods": ["validator"] }] */
validator(state) {
  const {
    number,
    date,
    user,
    text,
    rating,
  } = state;
  const allFormsValue = [number, date, user, text, rating];
  const allValidators = {
    [number]: (valueForm) => valueForm !== '_' && valid.isInt(valueForm) && valueForm.length <= 7,
    [date]: (valueForm) => !valid.isEmpty(valueForm),
    [user]: (valueForm) => !valid.isEmpty(valueForm) && valueForm !== 'Все',
    [text]: (valueForm) => !valid.isEmpty(valueForm),
    [rating]: (valueForm) => valid.isInt(valueForm),
  };
  const valueValidators = allFormsValue.map((val) => allValidators[val](val));
  const result = valueValidators.filter((val) => val === false);
  if (result.length === 0) {
    return false;
  }
  return true;
}

renderUserDateText() {
  const { date, text, user } = this.state;
  const { users } = this.props;
  return (
    <>
      <label htmlFor className="row no-gutters">
     Создано
        <p className="red-star">*</p>
        <input className="style-input input-data" onChange={this.changeDataTask('date')} name="date" value={date} type="date" from="data" />
        <img src="../images/data.png" alt="data" width="35" height="35" />
      </label>
      <Select users={users} onChange={this.changeDataTask('user')} type="formTask" user={user} />
      <label htmlFor className="row no-gutters">
    Текст
        <p className="red-star">*</p>
        <textarea className="input-text" onChange={this.changeDataTask('text')} value={text} />
      </label>
    </>
  );
}

renderRating() {
  const { rating } = this.state;
  return (
    <label htmlFor className="row no-gutters">
     Рейтинг
      <input className="input-rating" onChange={this.changeDataTask('rating')} name="rating" max="10" min="0" value={rating} type="number" />
      <p>от 1 до 10</p>
    </label>
  );
}

render() {
  const { number } = this.state;
  return (
    <div className="task-form">
      <h2 className="font-ad">
        <p>Объявление</p>
      </h2>
      <form onSubmit={this.submitTask}>
        <label htmlFor className="row no-gutters">
          Номер
          <p className="red-star">*</p>
          <input className="style-input not-arrow" onChange={this.changeDataTask('number')} name="number" value={number} min="0" type="number" />
          <p className="1">(не более 7 символов)</p>
        </label>
        {this.renderUserDateText()}
        {this.renderRating()}
        <input onClick={this.resetTask} type="button" value="Удалить" className="button-delete" />
        <button type="submit" disabled={this.validator(this.state)} className={this.validator(this.state) ? 'btn-save-disable' : 'btn-save'}>Сохранить</button>
        <Link to="/"><input type="button" value="Отменить" className="btn-cancellation" /></Link>
      </form>
    </div>
  );
}
}

export default connect(mapProps, allActions)(FormAddTask);
