import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link} from 'react-router-dom';

import Main from './containers/main/main';
import Login from './containers/login/login';
import Logout from './containers/login/logout';
import Status from './containers/login/status';
import Registration from './containers/registration/registration';
import answersTable from './containers/answersList/answersTable';
import FormList from './containers/forms/formList';
import FormItem from './containers/forms/formItem';
import NewForm from './containers/forms/newForm';
import PostField from './containers/fields/fieldPost';
import FieldsList from './containers/fields/fieldsList';
import DemoForm from './containers/demoForm/demoForm'

const Routers = () => {
    return (
        <BrowserRouter>
            <div id="header">
                <div id="header-pages">
                    <Link id="logo" to='/'>4M</Link>
                    <Link className="header-pages" to='/form'>My forms</Link>
                    <Link className="header-pages" to='/answers'>Answers</Link>
                    <Link className="header-pages" to='/field'>New field</Link>
                    <Link className="header-pages" to='/all'>All fields</Link>
                    <Link className="header-pages" to='/demoForm'>DemoForm</Link>
                </div>
                <div id="header-users">
                        <Link to='/login'>Login</Link>
                        <Link to='/logout'>Logout</Link>
                        <Link to='/registration'>Registration</Link>
                        <Link to='/status'>Status</Link>
                </div>
            </div>
            <Switch>
                <Route path='/' exact component={Main}/>
                <Route path='/login' component={Login}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/status' component={Status}/>
                <Route path='/answers' component={answersTable}/>
                <Route path="/form/:id" component={FormItem}/>
                <Route path="/form" component={FormList}/>
                <Route path="/new" component={NewForm}/>
                <Route path='/field' component={PostField}/>
                <Route path='/all' component={FieldsList}/>
                <Route path='/demoForm' component={DemoForm}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routers;
