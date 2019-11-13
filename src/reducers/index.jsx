import { createReducer } from 'redux-starter-kit';
import { combineReducers } from 'redux';
import * as actions from '../actions';

const users = createReducer([], {
  [actions.addUser]: (state, action) => ([...state, action.payload.user]),
});

const filters = createReducer({
  user: '',
  date: { before: '', after: '' },
  text: '',
},
{
  [actions.addFilterUser]: (state, action) => ({ ...state, user: action.payload.user }),
  [actions.addFilterText]: (state, action) => ({ ...state, text: action.payload.text }),
  [actions.addFilterDateBefore]: (state, action) => {
    const { before } = action.payload;
    return {
      ...state,
      date: {
        ...state.date,
        before,
      },
    };
  },
  [actions.addFilterDateAfter]: (state, action) => {
    const { after } = action.payload;
    return {
      ...state,
      date: {
        ...state.date,
        after,
      },
    };
  },
});

const dataChannel = createReducer({ currentId: 1, quantityTasks: 10 }, {
  [actions.addIdCurrent]: (state, action) => {
    const { id } = action.payload;
    return {
      ...state,
      currentId: id,
    };
  },
  [actions.addQuantityTasks]: (state, action) => {
    const { quantity } = action.payload;
    return {
      ...state,
      quantityTasks: quantity,
    };
  },
});

const tasks = createReducer({ allTasks: [], idTasksToRemove: [] }, {
  [actions.addTask]: (state, action) => {
    const { task } = action.payload;
    const { allTasks } = state;
    return {
      ...state,
      allTasks: [...allTasks, task],
    };
  },
  [actions.addIdTaskForRemove]: (state, action) => {
    const { id } = action.payload;
    const { idTasksToRemove } = state;
    return {
      ...state,
      idTasksToRemove: [...idTasksToRemove, id],
    };
  },
  [actions.deleteIDTaskForRemove]: (state, action) => {
    const { id } = action.payload;
    const { idTasksToRemove } = state;
    return {
      ...state,
      idTasksToRemove: idTasksToRemove.filter((idR) => idR !== id),
    };
  },
  [actions.resetTasks]: (state) => {
    const { allTasks, idTasksToRemove } = state;
    return {
      allTasks: allTasks.filter((task) => !idTasksToRemove.includes(task.id)),
      idTasksToRemove: [],
    };
  },
});

const contentTask = createReducer({
  number: '0',
  date: '',
  user: '',
  text: '',
  rating: '0',
}, {
  [actions.updateNumber]: (state, action) => ({ ...state, number: action.payload.number }),
  [actions.updateDate]: (state, action) => ({ ...state, date: action.payload.date }),
  [actions.updateUser]: (state, action) => ({ ...state, user: action.payload.user }),
  [actions.updateText]: (state, action) => ({ ...state, text: action.payload.text }),
  [actions.updateRating]: (state, action) => ({ ...state, rating: action.payload.rating }),
  [actions.resetContent]: () => ({
    number: 0,
    date: '',
    user: '',
    text: '',
    rating: 0,
  }),
});

export default combineReducers({
  users,
  tasks,
  contentTask,
  dataChannel,
  filters,
});
