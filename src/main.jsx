import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { router } from './routers/Router'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux-store'
import { Toaster } from './components/ui/sonner'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();



createRoot(document.getElementById('root')).render(
   <StrictMode>
      <Provider store={store}>
         <RouterProvider router={router} />
         <Toaster position="top-center" />
      </Provider>
   </StrictMode>
)
