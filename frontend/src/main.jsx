import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'sonner'
import { CookiesProvider } from "react-cookie";

createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <BrowserRouter>
      <Toaster
        richColors={false}
        toastOptions={{
          classNames: {
            toast: "rounded-lg shadow-md",
          }
        }}
      />
      <App />
    </BrowserRouter>,
  </CookiesProvider>
)
