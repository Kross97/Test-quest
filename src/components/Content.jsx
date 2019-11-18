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
  typeSort,
}) => {
  const props = {
    listAlerts,
    typeSort,
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
"exceptMethods": ["filtering","sorting"] }] */
sorting(tasksAfterFilters) {
  const { typeSort } = this.props;
  if (typeSort === '') {
    return tasksAfterFilters;
  }

  const newSliceTasks = tasksAfterFilters.slice(0);
  const allTypesSorting = {
    numberAscending: (tasks) => tasks.sort((a, b) => Number(a.number) - Number(b.number)),
    numberDesc: (tasks) => tasks.sort((a, b) => Number(b.number) - Number(a.number)),
    dataAscending: (tasks) => tasks.sort((a, b) => Date.parse(a.date) - Date.parse(b.date)),
    dataDesc: (tasks) => tasks.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)),
    textAscending: (tasks) => tasks.sort((a, b) => a.text > b.text),
    textDesc: (tasks) => tasks.sort((a, b) => a.text < b.text),
    ratingAscending: (tasks) => tasks.sort((a, b) => Number(a.rating) - Number(b.rating)),
    ratingDesc: (tasks) => tasks.sort((a, b) => Number(b.rating) - Number(a.rating)),
    userAscending: (tasks) => tasks.sort((a, b) => a.user > b.user),
    userDesc: (tasks) => tasks.sort((a, b) => a.user < b.user),
  };
  return allTypesSorting[typeSort](newSliceTasks);
}


filtering(tasks) {
  const {
    filterUser,
    filterText,
    filterDateBefore,
    filterDateAfter,
  } = this.props;

  const validFilters = [filterUser, filterText, filterDateBefore, filterDateAfter].filter((filter) => filter !== '' && filter !== 'Все');
  const allFilter = {
    [filterUser]: (allTasks) => allTasks.filter((task) => task.user === filterUser),
    [filterText]: (allTasks) => allTasks.filter((task) => task.text.includes(filterText)),
    [filterDateBefore]: (allTasks) => allTasks.filter((task) => (
      Date.parse(task.date) >= Date.parse(filterDateBefore)
    )),
    [filterDateAfter]: (allTasks) => allTasks.filter((task) => (
      Date.parse(task.date) <= Date.parse(filterDateAfter)
    )),
  };

  let filteringTasks = tasks;
  if (validFilters.length !== 0) {
    // eslint-disable-next-line no-return-assign
    validFilters.map((filter) => filteringTasks = allFilter[filter](filteringTasks));
  }
  return filteringTasks;
}

renderTasksList(channelTasks) {
  const { quantityTasks, idTasksToRemove } = this.props;
  return (
    <>
      {channelTasks.map((task, i) => {
        if (i >= quantityTasks) { return null; }
        const classDiv = cn({
          'task-item': true,
          'danger-them': idTasksToRemove.includes(task.id),
        });
        return (
          <button type="button" onClick={this.showResetButton(task.id)} key={task.id} className={classDiv}>
            <span className="item-numb">{task.number}</span>
            <span className="item-date">{task.date}</span>
            <span className="item-text">{task.text}</span>
            <span className="item-rating">{task.rating}</span>
            <span className="item-user">{task.user}</span>
          </button>
        );
      })}
    </>
  );
}

renderAndProcessedTasks() {
  const { tasks, channelId } = this.props;
  const tasksAfterFilters = this.filtering(tasks);
  if (tasksAfterFilters.length === 0) {
    return null;
  }
  const tasksAfterSorting = this.sorting(tasksAfterFilters);
  const currentChannelTasks = tasksAfterSorting.filter((task) => task.currentId === channelId);
  return (
    <div className="content-tasks container-fluid">
      {this.renderTasksList(currentChannelTasks)}
    </div>
  );
}

render() {
  const { tasks, listAlerts, idTasksToRemove } = this.props;
  return (
    <div className="container-tasks-and-button">
      {tasks.length !== 0 && this.renderAndProcessedTasks()}
      {listAlerts.length !== 0 && <ListAlerts />}
      { idTasksToRemove.length !== 0 && <ButtonDelete deleteTasks={this.resetChekedTasks} /> }
    </div>
  );
}
}

export default connect(mapProps, allActions)(ContentTasks);
