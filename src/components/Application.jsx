import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ContentTasks from './Content';
import FooterButtons from './Footer_buttons';
import NavigationSort from './Navigation_For_Sorting';
import FiltersForm from './Filters_Form';

const HomePage = () => (
  <div className="greate-container">
    <div className="container-fluid row no-gutters header">
      <Link to="/FormAddTask"><Button className="styleButtonAdd" type="button">Добавить задачу</Button></Link>
      <Link to="/FormAddUser"><Button className="styleButtonAdd" type="button">Добавить пользователя</Button></Link>
      <FiltersForm />
      <NavigationSort />
    </div>
    <ContentTasks />
    <FooterButtons />
  </div>
);

export default HomePage;
