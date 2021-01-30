import "bootstrap/dist/css/bootstrap.min.css"
import $ from "jquery";
import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/js/bootstrap.bundle"
import './index.css';
import App from './App';

import { BrowserRouter } from "react-router-dom"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);

