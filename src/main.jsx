import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login';
import DeckCardGame from './components/DeckCardGame/DeckCardGame';
import CardProvider from './context/CardContext';



ReactDOM.createRoot(document.getElementById('root')).render(<App/>

);
