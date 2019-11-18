import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { configureStore } from 'redux-starter-kit';
import reducer from './reducers';
import Application from './components/Application';
import FormAddTask from './components/Form_Add_Task';
import FormAddUser from './components/Form_Add_User';

const store = configureStore({
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  preloadedState: {
    users: [{ fullName: 'Все' }],
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
    <Router>
      <Route exact path="/" component={Application} />
      <Route path="/FormAddTask" component={FormAddTask} />
      <Route path="/FormAddUser" component={FormAddUser} />
    </Router>
  </Provider>,
  document.querySelector('#content'),
);
