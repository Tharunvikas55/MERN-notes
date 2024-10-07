import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {QueryClientProvider,QueryClient} from '@tanstack/react-query'
import { ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient=new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    
  </StrictMode>,
)
