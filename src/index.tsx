import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { CookiesProvider } from 'react-cookie';

const options = {
  position: positions.TOP_LEFT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <CookiesProvider> 
        <React.StrictMode>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </React.StrictMode>
      </CookiesProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
