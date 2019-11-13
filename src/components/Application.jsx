import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import FormAddTask from './Form_Add_Task';
import * as actions from '../actions';
import ModalAddUser from './Modal_Add_User';
import ContentTasks from './Content';
import FooterButtons from './Footer_buttons';
import NavigationSort from './Navigation_For_Sorting';

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

showFormTask = () => {
  const { showForm } = this.state;
  this.setState({ showForm: !showForm });
}

showModalAddUser = () => {
  const { showModal } = this.state;
  this.setState({ showModal: !showModal });
}

changeFilterUser = ({ target }) => {
  const { addFilterUser } = this.props;
  addFilterUser({ user: target.value });
}

dateFilterBefore = ({ target }) => {
  const { addFilterDateBefore } = this.props;
  addFilterDateBefore({ before: target.value });
}

dateFilterAfter = ({ target }) => {
  const { addFilterDateAfter } = this.props;
  addFilterDateAfter({ after: target.value });
}

changeTextSearch = ({ target }) => {
  this.setState({ textSearch: target.value });
}

changeFilterText = (e) => {
  e.preventDefault();
  const { addFilterText } = this.props;
  const { textSearch } = this.state;
  addFilterText({ text: textSearch });
}

/* eslint class-methods-use-this: ["error", {
"exceptMethods": ["homepage"] }] */
homepage() {
  const {
    users,
    before,
    after,
  } = this.props;
  const { textSearch } = this.state;
  return (
    <div className="greate-container">
      <div className="container-fluid row no-gutters header">
        <Button onClick={this.showFormTask} className="styleButtonAdd" type="button">Добавить задачу</Button>
        <Button onClick={this.showModalAddUser} className="styleButtonAdd" type="button">Добавить пользователя</Button>
        <form>
          <div className="block-user">
            <label htmlFor className="labelUser">
             Пользователь
              <select onChange={this.changeFilterUser} className="selectUser">
                {users.map((us) => (
                  <option key={us.fullName}>
                    {us.fullName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="search-data">
            <label htmlFor>
            от
              <input onChange={this.dateFilterBefore} type="date" value={before} className="styleInputDate" />
              <img src="../images/data2.png" alt="data" width="35" height="35" />
            </label>
            <label htmlFor>
              до
              <input onChange={this.dateFilterAfter} type="date" value={after} className="styleInputDate" />
              <img src="../images/data2.png" alt="data" width="35" height="35" />
            </label>
          </div>
          <div className="block-search">
            <button onClick={this.changeFilterText} type="button" className="img-search">
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

render() {
  const { showModal, showForm } = this.state;
  return (
    <div>
      <ModalAddUser show={showModal} handleClose={this.showModalAddUser} />
      { showForm ? <FormAddTask closeForm={this.showFormTask} /> : this.homepage() }
    </div>
  );
}
}

export default connect(mapProps, allActions)(HomePage);
