import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './CartProvider.jsx'


createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>,
  document.getElementById('root')
)
