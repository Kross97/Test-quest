import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions';

const ButtonDelete = (props) => {
  const { deleteTasks } = props;
  return <button onClick={deleteTasks} type="button" className="button-delete delete-task">Удалить</button>;
};


const mapProps = ({ tasks, dataChannel, filters }) => {
  const props = {
    tasks: tasks.allTasks,
    idTasksToRemove: tasks.idTasksToRemove,
    channelId: dataChannel.currentId,
    quantityTasks: dataChannel.quantityTasks,
    filterUser: filters.user,
    filterText: filters.text,
    filterDateBefore: filters.date.before,
    filterDateAfter: filters.date.after,
  };
  return props;
};

const allActions = {
  resetTasks: actions.resetTasks,
  addIdTaskForRemove: actions.addIdTaskForRemove,
  deleteIDTaskForRemove: actions.deleteIDTaskForRemove,
};

class ContentTasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showButton: false };
  }

showResetButton = (id) => (e) => {
  e.preventDefault();
  const { addIdTaskForRemove, deleteIDTaskForRemove, idTasksToRemove } = this.props;
  if (idTasksToRemove.includes(id)) {
    deleteIDTaskForRemove({ id });
  } else {
    addIdTaskForRemove({ id });
  }
  this.setState({ showButton: true });
}

resetChekedTasks = () => {
  const { resetTasks } = this.props;
  resetTasks();
  this.setState({ showButton: false });
}

/* eslint class-methods-use-this: ["error", {
"exceptMethods": ["filtering"] }] */
filtering(tasks) {
  const {
    filterUser,
    filterText,
    filterDateBefore,
    filterDateAfter,
  } = this.props;
  console.log('TEXT-FILTER', filterText);
  console.log('USER-FILTER', filterUser);
  console.log('DATE-FILTER', filterDateBefore, filterDateAfter);
  let filteringTasks = tasks;
  if (filterUser !== 'Все') {
    filteringTasks = filteringTasks.filter((task) => task.user === filterUser);
  }
  if (filterText !== '') {
    filteringTasks = filteringTasks.filter((task) => task.text.includes(filterText));
  }
  if (filterDateBefore !== '') {
    filteringTasks = filteringTasks.filter((task) => (
      Date.parse(task.date) >= Date.parse(filterDateBefore)
    ));
  }
  if (filterDateAfter !== '') {
    filteringTasks = filteringTasks.filter((task) => (
      Date.parse(task.date) <= Date.parse(filterDateAfter)
    ));
  }
  return filteringTasks;
}

renderTasks() {
  const {
    tasks,
    channelId,
    quantityTasks,
    idTasksToRemove,
  } = this.props;
  const tasksBeforeFilters = this.filtering(tasks);
  const currentChannelTasks = tasksBeforeFilters.filter((task) => task.channelId === channelId);
  return (
    <div className="content-tasks container-fluid">
      {currentChannelTasks.map((task, i) => {
        if (i >= quantityTasks) { return null; }
        const classDiv = cn({
          'task-item': true,
          'danger-them': idTasksToRemove.includes(task.id),
        });
        return (
          <div onClick={this.showResetButton(task.id)} key={task.id} tabIndex={0} onKeyUp className={classDiv} role="button">
            <span className="item-numb">{task.number}</span>
            <span className="item-date">{task.date}</span>
            <span className="item-text">{task.text}</span>
            <span className="item-rating">{task.rating}</span>
            <span className="item-user">{task.user}</span>
          </div>
        );
      })}
    </div>
  );
}

render() {
  const { tasks } = this.props;
  const { showButton } = this.state;
  return (
    <div className="container-tasks-and-button">
      {tasks.length !== 0 && this.renderTasks()}
      { showButton && <ButtonDelete deleteTasks={this.resetChekedTasks} /> }
    </div>
  );
}
}

export default connect(mapProps, allActions)(ContentTasks);
