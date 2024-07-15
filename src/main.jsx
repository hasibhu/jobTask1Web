import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from '../src/components/Router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <RouterProvider router={Router}><App></App><RouterProvider   /> */}
    <RouterProvider router={Router}><App></App></RouterProvider>
  </React.StrictMode>,
)
