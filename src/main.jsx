import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SelectService from './pages/SelectService.jsx'
import Payment from './pages/Payment.jsx'
import Home from './pages/Home.jsx'
import Layout from './components/Layout.jsx'


const router = createBrowserRouter([
  {
  path: "",
  element: <App/>
  },

  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "select-service", element: <SelectService /> },
      { path: "payment", element: <Payment /> },
    ],
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
