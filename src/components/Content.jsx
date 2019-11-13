import React from 'react';
import cn from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ListAlerts from './List_Alerts';

const ButtonDelete = (props) => {
  const { deleteTasks } = props;
  return <button onClick={deleteTasks} type="button" className="button-delete delete-task">Удалить</button>;
};


const mapProps = ({
  tasks,
  dataChannel,
  filters,
  listAlerts,
}) => {
  const props = {
    listAlerts,
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
  addAlert: actions.addAlert,
};

class ContentTasks extends React.Component {
showResetButton = (id) => (e) => {
  e.preventDefault();
  const {
    addIdTaskForRemove,
    deleteIDTaskForRemove,
    idTasksToRemove,
  } = this.props;
  if (idTasksToRemove.includes(id)) {
    deleteIDTaskForRemove({ id });
  } else {
    addIdTaskForRemove({ id });
  }
}

resetChekedTasks = () => {
  const { resetTasks, addAlert } = this.props;
  resetTasks();
  const alert = { id: _.uniqueId(), type: 'remove_task', message: 'Отмеченные задачи успешно удаленны!' };
  addAlert({ alert });
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

  if (tasksBeforeFilters.length === 0) {
    return null;
  }

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
  const {
    tasks,
    listAlerts,
    idTasksToRemove,
  } = this.props;
  return (
    <div className="container-tasks-and-button">
      {tasks.length !== 0 && this.renderTasks()}
      {listAlerts.length !== 0 && <ListAlerts />}
      { idTasksToRemove.length !== 0 && <ButtonDelete deleteTasks={this.resetChekedTasks} /> }
    </div>
  );
}
}

export default connect(mapProps, allActions)(ContentTasks);
