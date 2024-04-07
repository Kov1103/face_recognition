import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
// import './index.css';
import reportWebVitals from './reportWebVitals';

import HomePage from "./components/HomePage"
import Login from "./components/Login"
import HomeAdmin from "./components/admin/HomeAdmin"
import People from "./components/admin/People"
import Admin from "./components/admin/Admin"
import InsertAdmin from "./components/admin/InsertAdmin"
import DeleteAdmin from "./components/admin/DeleteAdmin"
import EditAdmin from "./components/admin/EditAdmin"
import CodeRunner from "./components/CodeRunner"
import History from "./components/admin/History"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<HomePage />} ></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/runcode' element={<CodeRunner />}></Route>
    <Route path='/homeadmin' element={<HomeAdmin />}></Route>
    <Route path='/people' element={<People />}></Route>
    <Route path='/admin' element={<Admin />}></Route>
    <Route path='/insertadmin' element={<InsertAdmin />}></Route>
    <Route path='/deleteadmin' element={<DeleteAdmin />}></Route>
    <Route path='/editadmin' element={<EditAdmin />}></Route>
    <Route path='/history' element={<History />}></Route>
  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
