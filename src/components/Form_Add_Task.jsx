import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import valid from 'validator';
import * as actions from '../actions';

const AlertErorValid = () => (
  <div className="eror-form alert alert-danger" role="alert">
      Не заполненны обязательные поля! Введите данные!
  </div>
);

const mapProps = ({ contentTask, users, dataChannel }) => {
  const props = {
    users,
    number: contentTask.number,
    date: contentTask.date,
    user: contentTask.user,
    text: contentTask.text,
    rating: contentTask.rating,
    channelId: dataChannel.currentId,
  };
  return props;
};


const allActions = {
  addTask: actions.addTask,
  updateNumber: actions.updateNumber,
  updateDate: actions.updateDate,
  updateUser: actions.updateUser,
  updateText: actions.updateText,
  updateRating: actions.updateRating,
  resetContent: actions.resetContent,
  addAlert: actions.addAlert,
};

class FormAddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notValid: false };
  }

  resetTask = () => {
    const { resetContent } = this.props;
    resetContent();
  }

submitTask = (e) => {
  e.preventDefault();
  const {
    addTask,
    closeForm,
    resetContent,
    number,
    channelId,
    date,
    user,
    text,
    rating,
    addAlert,
  } = this.props;
  if (number === '0' || valid.isEmpty(date) || valid.isEmpty(user)
  || user === 'Все' || valid.isEmpty(text) || !valid.isInt(rating) || !valid.isInt(number)) {
    this.setState({ notValid: true });
  } else {
    const task = {
      id: _.uniqueId(),
      channelId,
      number,
      date,
      user,
      text,
      rating,
    };
    addTask({ task });
    const alert = { id: _.uniqueId(), type: 'add_task', message: 'Задача успешно создана!' };
    addAlert({ alert });
    resetContent();
    this.setState({ notValid: false });
    closeForm();
  }
};

changeDataTask = (type) => ({ target }) => {
  const {
    updateNumber,
    updateDate,
    updateUser,
    updateText,
    updateRating,
  } = this.props;
  switch (type) {
    case 'number':
      updateNumber({ [type]: target.value });
      break;
    case 'date':
      updateDate({ [type]: target.value });
      break;
    case 'user':
      updateUser({ [type]: target.value });
      break;
    case 'text':
      updateText({ [type]: target.value });
      break;
    case 'rating':
      updateRating({ [type]: target.value });
      break;
    default:
      console.log('privet!');
  }
}

renderUser() {
  const { user, users } = this.props;
  return (
    <label htmlFor className="row no-gutters">
  Пользователь
      <p className="red-star">*</p>
      <select className="style-input input-user" onChange={this.changeDataTask('user')} name="user" value={user}>
        {users.map((us) => (
          <option key={us.fullName}>
            {us.fullName}
          </option>
        ))}
      </select>
    </label>
  );
}

renderUserDateText() {
  const { date, text } = this.props;
  return (
    <>
      <label htmlFor className="row no-gutters">
     Создано
        <p className="red-star">*</p>
        <input className="style-input input-data" onChange={this.changeDataTask('date')} name="date" value={date} type="date" from="data" />
        <img src="../images/data.png" alt="data" width="35" height="35" />
      </label>
      {this.renderUser()}
      <label htmlFor className="row no-gutters">
    Текст
        <p className="red-star">*</p>
        <textarea className="input-text" onChange={this.changeDataTask('text')} value={text} />
      </label>
    </>
  );
}

render() {
  const {
    closeForm,
    number,
    rating,
  } = this.props;

  const { notValid } = this.state;
  return (
    <div className="task-form">
      <h2 className="font-ad">
        <font>Объявление</font>
      </h2>
      <form onSubmit={this.submitTask}>
        <label htmlFor className="row no-gutters label-input">
          Номер
          <p className="red-star">*</p>
          <input className="style-input not-arrow" onChange={this.changeDataTask('number')} name="number" value={number} min="0" type="number" />
          <p className="1">(не более 7 символов)</p>
        </label>
        {this.renderUserDateText()}
        <label htmlFor className="row no-gutters">
         Рейтинг
          <input className="input-rating" onChange={this.changeDataTask('rating')} name="rating" max="10" min="0" value={rating} type="number" />
          <p>от 1 до 10</p>
        </label>
        <input onClick={this.resetTask} type="button" value="Удалить" className="button-delete" />
        <input onClick={this.submitTask} type="submit" value="Сохранить" className="btn-save" />
        <input onClick={closeForm} type="button" value="Отменить" className="btn-cancellation" />
        {notValid && <AlertErorValid />}
      </form>
    </div>
  );
}
}

export default connect(mapProps, allActions)(FormAddTask);
