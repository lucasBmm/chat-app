import React, { useContext } from 'react';
import { Register } from './pages/Register/Register';
import './style.scss'
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import { PropsWithChildren } from 'react';

function App(): JSX.Element {

  const user = useContext(AuthContext);

  const ProctectedRoute = ({ children }: any) => {
    console.log("Verificando se há usuário")
    if (!user) {
      console.log("O usuário não está logado")
      return <Navigate to="/login" />
    } else {
      console.log("O usuário está logado: ")
      console.log(user)
      return children;
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index            element={<ProctectedRoute><Home /></ProctectedRoute>}      />
            <Route path='login'     element={<Login />}     />
            <Route path='register'  element={<Register />}  />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
