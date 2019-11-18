import { createAction } from 'redux-actions';

// all aded to application
export const addUser = createAction('ADD_USER');

export const addTask = createAction('ADD_TASK');

export const addIdCurrent = createAction('ADD_CURRENT_ID');

export const addQuantityTasks = createAction('ADD_QUANTITY');

export const resetTasks = createAction('RESET_TASKS');
// sort sort

export const addTypeSort = createAction('ADD_TYPE_SORT');

// add id to remove
export const addIdTaskForRemove = createAction('ADD_ID_REMOVE');

export const deleteIDTaskForRemove = createAction('DELETE_ID_REMOVE');

// add filters
export const addFilterUser = createAction('ADD_FILTER_USER');

export const addFilterText = createAction('ADD_FILTER_TEXT');

export const addFilterDateBefore = createAction('ADD_FILTER_DATE_BEFORE');

export const addFilterDateAfter = createAction('ADD_FILTER_DATE_AFTER');

// add alert for list

export const addAlert = createAction('ADD_ALERT');

export const removeAlert = createAction('REMOVE_ALERT');

export const removeAllList = createAction('REMOVE_LIST_ALERTS');
