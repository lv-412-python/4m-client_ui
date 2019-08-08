import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Login from './containers/login/login';
import Logout from './containers/login/logout';
import Status from './containers/login/status';
import Registration from './containers/registration/registration';
import Form from './components/forms/form';
import ResetPassword from './containers/resetPasswd/resetPasswd';
import SetNewPassword from './containers/resetPasswd/setNewPasswd';
import FormItem from './components/forms/formItem/formItem';
import FormField from './components/newFormAndFields/newFormAndFields';
import CreateGroup from './components/groups/createGroup/createGroup';
import Group from './components/groups/group';
import GetOneGroup from './components/groups/getOneGroup/getOneGroup';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AnswersForm from './components/answers/answersForm/answersForm';
import Main from './containers/main/main';


const Routers = () => {
    return (
        <BrowserRouter>
            <Header/>
            <div className='container'>
                <Switch>
                    <Route path='/' exact component={Main}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/profile' component={Status}/>
                    <Route path='/reset_password' component={ResetPassword}/>
                    <Route path='/set_new_password' component={SetNewPassword}/>
                    <Route path="/form/:id" component={FormItem}/>
                    <Route path="/form" component={Form}/>
                    <Route path="/new" component={FormField}/>
                    <Route path='/group' component={Group}/>
                    <Route path='/group/:id' component={GetOneGroup}/>
                    <Route path='/new-group' component={CreateGroup}/>
                    <Route path='/answersForm' component={AnswersForm}/>
                </Switch>
            </div>
            <Footer/>
        </BrowserRouter>
    );
};

export default Routers;
