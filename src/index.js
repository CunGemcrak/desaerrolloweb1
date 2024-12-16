import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import 'bootstrap/dist/js/bootstrap.min.js'; 
import { BrowserRouter } from "react-router-dom"; // Comportamientos de Bootstrap
import { Provider } from "react-redux";
import store from "./Redux/store.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
        <App />
    
    </BrowserRouter>
    </Provider>
  </React.StrictMode>



);


