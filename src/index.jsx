import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';
import reducer from './reducers';
import Application from './components/Application';

const store = configureStore({
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  preloadedState: {
    users: [{ fullName: 'Все' }],
    contentTask: {
      number: '0',
      date: '',
      user: 'Все',
      text: '',
      rating: '0',
    },
    dataChannel: {
      currentId: 1,
      quantityTasks: 10,
    },
    filters: {
      user: 'Все',
      date: {
        before: '',
        after: '',
      },
      text: '',
    },
    typeSort: '',
  },
});
ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.querySelector('#content'),
);
