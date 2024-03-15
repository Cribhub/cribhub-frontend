import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-aamlir0zbc8oho4d.us.auth0.com'
      clientId='FrNCIYCymgt7jrlvEGfORm2WZ8etsW4K'
      authorizationParams={{ redirectUri: window.location.origin }}
    >
    <App />
    </Auth0Provider>
  </React.StrictMode>,
)
