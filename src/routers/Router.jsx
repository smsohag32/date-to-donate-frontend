import Main from "@/layouts/Main"
import About from "@/pages/About/About"
import Login from "@/pages/Auth/Login/Login"
import Register from "@/pages/Auth/Register/Register"
import Contact from "@/pages/Contact/Contact"
import FindDonor from "@/pages/FindDonor/FindDonor"
import HomePage from "@/pages/Home/HomePage"
import NotFound from "@/pages/NotFound/NotFound"
import Profile from "@/pages/User/Profile/Profile"
import { createBrowserRouter } from "react-router-dom"
import SecureRoute from "./SecureRoute"
import UserDashboardLayout from "@/components/layouts/UserLayout/UserDashboardLayout"
import UserFindDonors from "@/pages/User/FindDonors/UserFindDonors"
import DonorProfile from "@/pages/User/DonorProfile/DonorProfile"
import DummyUser from "@/pages/DummyUser/DummyUser"

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <HomePage />
         },
         {
            path: "/find-donor",
            element: <FindDonor />
         },

         {
            path: "/contact-us",
            element: <Contact />
         },
         {
            path: "/about",
            element: <About />
         },
         {
            path: "/login",
            element: <Login />
         },
         {
            path: "/register",
            element: <Register />
         },
         {
            path: "/profile",
            element: <SecureRoute userRoles={["user"]}>
               <Profile />
            </SecureRoute>
         },
         {
            path: "/dummy-user-add",
            element: <DummyUser />
         }
      ]
   },

   {
      path: "/dashboard",
      element: <UserDashboardLayout />,
      children: [
         {
            path: "/dashboard",
            element: <Profile />
         },
         {
            path: "/dashboard/profile",
            element: <Profile />
         },
         {
            path: "/dashboard/find-donors",
            element: <UserFindDonors />
         },
         {
            path: "/dashboard/find-donors/:donorId",
            element: <SecureRoute userRoles={["user"]}>
               <DonorProfile />
            </SecureRoute>
         },

      ]
   },


   {
      path: "*",
      element: <NotFound />
   }
])
