import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TareasExternasProvider } from './context/TareasExternasContext';
import { AuthProvider } from './hooks/useAuth';
import App from './App';

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

