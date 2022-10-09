import React from 'react';
import { Register } from './pages/Register/Register';
import './style.scss'
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='login' index element={<Login />} />
          <Route path='register' index element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
