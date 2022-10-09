import React from 'react';
import { Register } from './pages/Register/Register';
import './style.scss'
import { Login } from './pages/Login/Login';

function App(): JSX.Element {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
