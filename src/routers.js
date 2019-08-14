import React from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom';

import Login from './components/login/login';
import Profile from './components/profile/profile';
import Registration from './components/registration/registration';
import Form from './components/forms/form';
import ResetPassword from './components/resetPasswd/resetPasswd';
import SetNewPassword from './components/resetPasswd/setNewPasswd';
import FormItem from "src/components/forms/formItem/formItem";
import FormField from './components/newFormAndFields/newFormAndFields';
import {CreateGroup} from './components/groups';
import Group from './components/groups/group';
import {GetOneGroup} from './components/groups';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AnswersForm from './components/answers/answersForm/answersForm';
import AsignedForms from './components/answers/asignedForms/asignedForms';
import Main from './containers/main/main';
import {EditGroup} from './components/groups';


const Routers = () => {
    return (
        <BrowserRouter>
            <Header/>
            <div className='container'>
                <Switch>
                    <Route path='/' exact component={Main}/>
                    <Route path='/signin' component={Login}/>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/reset_password' component={ResetPassword}/>
                    <Route path='/set_new_password' component={SetNewPassword}/>
                    <Route path="/form/:id" component={FormItem}/>
                    <Route path="/form" component={Form}/>
                    <Route path="/new" component={FormField}/>
                    <Route path='/group' component={Group}/>
                    <Route path='/group/:id' component={GetOneGroup}/>
                    <Route path='/new-group' component={CreateGroup}/>
                    <Route path='/answersForm' component={AnswersForm}/>
                    <Route path='/edit' component={EditGroup} />
                    <Route path='/asignedForms' component={AsignedForms} />
                </Switch>
            </div>
            <Footer/>
        </BrowserRouter>
    );
};

export default Routers;
