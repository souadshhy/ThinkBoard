// React's work flow explaination (Super basic)
// the main.jsx file:
// Find the spot in the HTML where it should show the app
// Take your App.jsx code (which returns HTML-like code)
// Turn that code into something the browser understands
// Show it on the screen

import { StrictMode } from 'react'
import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
  </StrictMode>,
)
