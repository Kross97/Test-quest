import { createAction } from 'redux-actions';

// all aded to application
export const addUser = createAction('ADD_USER');

export const addTask = createAction('ADD_TASK');

export const addIdCurrent = createAction('ADD_CURRENT_ID');

export const addQuantityTasks = createAction('ADD_QUANTITY');

export const resetTasks = createAction('RESET_TASKS');

// modify task content
export const updateNumber = createAction('UPDATE_NUMBER');

export const updateDate = createAction('UPDATE_DATE');

export const updateUser = createAction('UPDATE_USER');

export const updateText = createAction('UPDATE_TEXT');

export const updateRating = createAction('UPDATE_RATING');

export const resetContent = createAction('RESET_CONTENT');

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
