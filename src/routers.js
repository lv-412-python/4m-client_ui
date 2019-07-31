import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Login from './containers/login/login';
import Logout from './containers/login/logout';
import Status from './containers/login/status';
import Registration from './containers/registration/registration';
import answersTable from './components/answersList/answersTable';
import FormList from './components/forms/formList/formList';
import FormItem from './components/forms/formItem/formItem';
import NewForm from './components/forms/newForm/newForm';
import PostField from './components/fields/fieldPost/fieldPost';
import FieldsList from './components/fields/fieldsList/fieldsList';
import Header from './components/header/header';
import Main from './containers/main/main';

const Routers = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path='/' exact component={Main}/>
                <Route path='/login' component={Login}/>
                <Route path='/logout' component={Logout}/>
                <Route path='/registration' component={Registration}/>
                <Route path='/profile' component={Status}/>
                <Route path='/answers' component={answersTable}/>
                <Route path="/form/:id" component={FormItem}/>
                <Route path="/form" component={FormList}/>
                <Route path="/new" component={NewForm}/>
                <Route path='/field' component={PostField}/>
                <Route path='/all' component={FieldsList}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routers;
