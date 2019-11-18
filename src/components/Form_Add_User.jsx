import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import valid from 'validator';
import _ from 'lodash';
import * as actions from '../actions';

const mapProps = ({ users }) => ({ users });

const allActions = {
  addUser: actions.addUser,
  addAlert: actions.addAlert,
};

class FormAddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', lastName: '' };
  }


changeDataUser = (type) => ({ target }) => {
  switch (type) {
    case 'name':
      this.setState({ name: target.value });
      break;
    case 'lastName':
      this.setState({ lastName: target.value });
      break;
    default:
  }
}

submitUser = (e) => {
  e.preventDefault();
  const { addUser, addAlert } = this.props;
  const { name, lastName } = this.state;
  const user = { fullName: `${name}.${lastName[0]}` };
  addUser({ user });
  const alert = { id: _.uniqueId(), type: 'user', message: 'Пользователь успешно добавленн!' };
  addAlert({ alert });
  this.setState({ name: '', lastName: '' });
}

/* eslint class-methods-use-this: ["error", {
"exceptMethods": ["validator"] }] */
validator(name, lastName) {
  const allFormsValue = [name, lastName];
  const allValidators = {
    [name]: (valueForm) => !valid.isEmpty(valueForm) && !valid.isInt(valueForm),
    [lastName]: (valueForm) => !valid.isEmpty(valueForm) && !valid.isInt(valueForm),
  };
  const valueValidators = allFormsValue.map((val) => allValidators[val](val));
  const result = valueValidators.filter((val) => val === false);
  if (result.length === 0) {
    return false;
  }
  return true;
}

render() {
  const { name, lastName } = this.state;

  return (
    <div className="task-form">
      <h2 className="font-ad">
        <p>Добавить пользователя</p>
      </h2>
      <form onSubmit={this.submitUser}>
        <label htmlFor className="row no-gutters">
          Имя
          <p className="red-star">*</p>
          <input className="style-input not-arrow" onChange={this.changeDataUser('name')} value={name} name="name" type="text" />
        </label>
        <label htmlFor className="row no-gutters">
          Фамилия
          <p className="red-star">*</p>
          <input className="style-input-lastName not-arrow" onChange={this.changeDataUser('lastName')} value={lastName} name="lastName" type="text" />
        </label>
        <input disabled={this.validator(name, lastName)} type="submit" value="Добавить" className={this.validator(name, lastName) ? 'btn-save-disable-user' : 'btn-save-user'} />
        <Link to="/"><input type="button" value="Отменить" className="btn-cancellation" /></Link>
      </form>
    </div>
  );
}
}

export default connect(mapProps, allActions)(FormAddUser);
