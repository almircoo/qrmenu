import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { AuthContext } from '@contexts/AuthContext'
import App from '@routes/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <App />
      </AuthContext>
    </BrowserRouter>
  </StrictMode>,
)
