import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login';
import DeckCardGame from './components/DeckCardGame/DeckCardGame';
import {CardProvider} from './context/CardContext';
import Header from './components/Header/Header';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/DeckCardGame",
    element: <DeckCardGame />
  }
]);
function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/DeckCardGame",
      element: <DeckCardGame />
    }
  ]);
  return (

    <CardProvider>
      <Header/>
      <RouterProvider router={router}></RouterProvider>
    </CardProvider>


  )
}

export default App
