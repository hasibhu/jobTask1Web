import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from '../src/components/Router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../src/components/AuthContext.jsx'
import Layout from './Layout/Layout.jsx'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>

      

      <AuthProvider>
        <RouterProvider router={Router}>
          {/* <Layout></Layout> */}
        </RouterProvider> 
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

