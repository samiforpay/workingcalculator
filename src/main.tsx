import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AnnouncementProvider } from './contexts/AnnouncementContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnnouncementProvider>
        <App />
      </AnnouncementProvider>
    </BrowserRouter>
  </React.StrictMode>,
)