import {
  Modal,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import React from 'react';
import valid from 'validator';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { inputsModalAddUser } from './AST_buttons_span';

const AlertEror = () => (
  <div className="alert alert-danger" role="alert">
  Не введено имя или фамилия
  </div>
);

const mapProps = ({ users }) => ({ users });

const allActions = {
  addUser: actions.addUser,
  addAlert: actions.addAlert,
};

class ModalAddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', lastName: '', notValid: false };
  }

submitUser = (e) => {
  e.preventDefault();
  const { addUser, addAlert, handleClose } = this.props;
  const { name, lastName } = this.state;
  if (valid.isEmpty(name) || valid.isEmpty(lastName)
 || valid.isInt(name) || valid.isInt(lastName)) {
    this.setState({ notValid: true });
  } else {
    const user = { fullName: `${name}.${lastName[0]}` };
    addUser({ user });
    const alert = { id: _.uniqueId(), type: 'user', message: 'Пользователь успешно добавлен!' };
    addAlert({ alert });
    this.setState({ name: '', lastName: '', notValid: false });
    handleClose();
  }
}

changeNameOrLastName = (type) => ({ target }) => {
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

render() {
  const { show, handleClose } = this.props;
  const { notValid } = this.state;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление нового пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {inputsModalAddUser.map((input) => (
          <InputGroup key={input.type} className="mb-3">
            <FormControl onChange={this.changeNameOrLastName(input.type)} placeholder={input.placeholder} aria-label="Username" aria-describedby="basic-addon1" />
          </InputGroup>
        ))}
        { notValid && <AlertEror /> }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={this.submitUser}>
            Добавить
        </Button>
        <Button variant="secondary" onClick={handleClose}>
            Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
}

export default connect(mapProps, allActions)(ModalAddUser);
