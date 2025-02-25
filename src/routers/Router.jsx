import Main from "@/layouts/Main"
import HomePage from "@/pages/Home/HomePage"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <HomePage />
         }
      ]
   }
])
