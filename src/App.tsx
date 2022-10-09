import React from 'react';
import { Register } from './pages/Register/Register';
import './style.scss'
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';

function App(): JSX.Element {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
