import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Wrap App with BrowserRouter
ReactDOM.render(_jsx(BrowserRouter, { children: _jsx(App, {}) }), document.getElementById('root'));
