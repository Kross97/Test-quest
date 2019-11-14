import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import FormAddTask from './Form_Add_Task';
import * as actions from '../actions';
import ModalAddUser from './Modal_Add_User';
import ContentTasks from './Content';
import FooterButtons from './Footer_buttons';
import NavigationSort from './Navigation_For_Sorting';
import Select from './Select_Users';

const mapProps = ({ users, filters }) => {
  const { before, after } = filters.date;
  return {
    users,
    before,
    after,
  };
};

const allActions = {
  addUser: actions.addUser,
  addTask: actions.addTask,
  addFilterUser: actions.addFilterUser,
  addFilterDateBefore: actions.addFilterDateBefore,
  addFilterDateAfter: actions.addFilterDateAfter,
  addFilterText: actions.addFilterText,
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showForm: false, showModal: false, textSearch: '' };
  }

showFormsTaskAndModal = (type) => () => {
  const { showForm, showModal } = this.state;
  switch (type) {
    case 'form':
      this.setState({ showForm: !showForm });
      break;
    case 'modal':
      this.setState({ showModal: !showModal });
      break;
    default:
  }
}

changeDataFilter = (type) => ({ target }) => {
  const { textSearch } = this.state;
  const {
    addFilterUser,
    addFilterDateBefore,
    addFilterDateAfter,
    addFilterText,
  } = this.props;
  switch (type) {
    case 'user':
      addFilterUser({ user: target.value });
      break;
    case 'before':
      addFilterDateBefore({ before: target.value });
      break;
    case 'after':
      addFilterDateAfter({ after: target.value });
      break;
    case 'text':
      addFilterText({ text: textSearch });
      break;
    default:
  }
}

changeTextSearch = ({ target }) => {
  this.setState({ textSearch: target.value });
}

/* eslint class-methods-use-this: ["error", {
"exceptMethods": ["homepage","renderUser"] }] */

homepage() {
  const { users } = this.props;
  const { textSearch } = this.state;
  return (
    <div className="greate-container">
      <div className="container-fluid row no-gutters header">
        <Button onClick={this.showFormsTaskAndModal('form')} className="styleButtonAdd" type="button">Добавить задачу</Button>
        <Button onClick={this.showFormsTaskAndModal('modal')} className="styleButtonAdd" type="button">Добавить пользователя</Button>
        <form>
          <div className="block-user">
            <Select users={users} onChange={this.changeDataFilter('user')} type="mainMenu" />
          </div>
          {this.renderDate()}
          <div className="block-search">
            <button onClick={this.changeDataFilter('text')} type="button" className="img-search">
              <img src="../images/search.png" width="35" height="35" alt="search" />
            </button>
            <input onChange={this.changeTextSearch} className="styleInputSearch" type="name" value={textSearch} placeholder="поиск по тексту" />
          </div>
        </form>
        <NavigationSort />
      </div>
      <ContentTasks />
      <FooterButtons />
    </div>
  );
}

renderDate() {
  const { before, after } = this.props;
  const labelsDateFilters = [{ type: 'before', text: 'от' }, { type: 'after', text: 'до' }];
  return (
    <div className="search-data">
      {labelsDateFilters.map((label) => (
        <label key={label.type} htmlFor>
          {label.text}
          <input onChange={this.changeDataFilter(`${label.type}`)} type="date" value={label.type === 'before' ? before : after} className="styleInputDate" />
          <img src="../images/data2.png" alt="data" width="35" height="35" />
        </label>
      ))}
    </div>
  );
}

render() {
  const { showModal, showForm } = this.state;
  return (
    <div>
      <ModalAddUser show={showModal} handleClose={this.showFormsTaskAndModal('modal')} />
      { showForm ? <FormAddTask closeForm={this.showFormsTaskAndModal('form')} /> : this.homepage() }
    </div>
  );
}
}

export default connect(mapProps, allActions)(HomePage);
