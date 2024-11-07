import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Orden from './pages/orden'
import Login from './pages/login';
import Pedidos from './pages/pedidos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='orden' element={<Orden/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='pedidos' element={<Pedidos/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
