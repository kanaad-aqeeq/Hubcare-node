// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from "react";
import { Provider } from 'react-redux';
import store from './Redux-store/Store';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import './assets/css/font-awesome.min.css'
import "./assets/css/all.min.css";
import './assets/css/style.css'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById("root")).render(

<React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
</React.StrictMode>
);
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )




