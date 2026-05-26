import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routerApp } from './routes/routerApp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routerApp)} />
  </StrictMode>,
)
