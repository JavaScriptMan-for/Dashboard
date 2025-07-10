import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import store from "@slices-my/store"
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'


import App from './App'

const Query_Client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={Query_Client}>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider> 
    </QueryClientProvider>
  </StrictMode>,
)
