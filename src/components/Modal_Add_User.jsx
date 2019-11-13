import {
  Modal,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import React from 'react';
import valid from 'validator';
import { connect } from 'react-redux';
import * as actions from '../actions';

const AlertEror = () => (
  <div className="alert alert-danger" role="alert">
  Не введено имя или фамилия
  </div>
);

const mapProps = ({ users }) => ({ users });

const allActions = {
  addUser: actions.addUser,
};

class ModalAddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', lastName: '', notValid: false };
  }

submitUser = (e) => {
  e.preventDefault();
  const { addUser, handleClose } = this.props;
  const { name, lastName } = this.state;
  if (valid.isEmpty(name) || valid.isEmpty(lastName)
 || valid.isInt(name) || valid.isInt(lastName)) {
    this.setState({ notValid: true });
  } else {
    const user = { fullName: `${name}.${lastName[0]}` };
    addUser({ user });
    this.setState({ name: '', lastName: '', notValid: false });
    handleClose();
  }
}

changeName = ({ target }) => {
  this.setState({ name: target.value });
}

changeLastName = ({ target }) => {
  this.setState({ lastName: target.value });
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
        <InputGroup className="mb-3">
          <FormControl onChange={this.changeName} placeholder="Enter your name" aria-label="Username" aria-describedby="basic-addon1" />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl onChange={this.changeLastName} placeholder="enter last name" aria-label="Username" aria-describedby="basic-addon1" />
        </InputGroup>
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
