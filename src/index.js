import React from 'react';
import 'font-awesome/css/font-awesome.min.css'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TareasExternasProvider } from './context/TareasExternasContext';
import './styles.css'
import App from './App';
import { AuthProvider } from './hooks/useAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <TareasExternasProvider>
          <App />
      </TareasExternasProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

