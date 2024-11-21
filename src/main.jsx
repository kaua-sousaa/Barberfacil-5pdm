import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SelectService from './pages/SelectService.jsx'
import Payment from './pages/Payment.jsx'
import Home from './pages/Home.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "SelectService",
    element: <SelectService/>
  },
  {
    path: "Payment",
    element: <Payment/>
  },
  {
    path: "Home",
    element: <Home/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
