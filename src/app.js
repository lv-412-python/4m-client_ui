import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import Routers from "src/routers";

const app = (
    <Routers />
);

ReactDOM.render(app, document.getElementById('root'));
