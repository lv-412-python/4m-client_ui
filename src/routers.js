import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link} from 'react-router-dom';

import Main from './containers/main/main';
import Login from './containers/login/login';
import Registration from './containers/registration/registration';

const Routers = () => {
  return (

    <BrowserRouter>
      <ul>
        <li><Link to='/'>Main</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/registration'>Registration</Link></li>
      </ul>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/login' component={Login}/>
        <Route path='/registration' component={Registration}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routers;
