import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { ToggleFormShowProvider } from './context/ToggleFormContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { GroupDetailFetchProvider } from './context/GroupDetailFetchContext.jsx'
import { SidebarToggleContextProvider } from './context/SidebarToggleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ToggleFormShowProvider>
          <GroupDetailFetchProvider>
            <SidebarToggleContextProvider>
              <App />
            </SidebarToggleContextProvider>
          </GroupDetailFetchProvider>
        </ToggleFormShowProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
