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
import DonationRequest from "@/pages/donation_request/DonationRequest"
import DashboardOverview from "@/pages/DashboardOverview/DashboardOverview"
import UploadDonors from "@/pages/donor_management/upload_donors/UploadDonors"

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
            path: "/auth/login",
            element: <Login />
         },
         {
            path: "/auth/register",
            element: <Register />
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
   // {
   //    path: "/auth",
   //    element: <AuthLayout />,
   //    children: [
   //       {
   //          path: "/auth/login",
   //          element: <Login />
   //       },
   //       {
   //          path: "/auth/register",
   //          element: <Register />
   //       },
   //    ]
   // },

   {
      path: "/dashboard",
      element: <UserDashboardLayout />,
      children: [
         {
            path: "/dashboard",
            element: <DashboardOverview />
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

         // donor management
         {
            path: "/dashboard/upload-donors",
            element: <SecureRoute userRoles={["user"]}>
               <UploadDonors />
            </SecureRoute>
         },
         {
            path: "/dashboard/donation_request",
            element: <SecureRoute userRoles={["user"]}>
               <DonationRequest />
            </SecureRoute>
         },

      ]
   },


   {
      path: "*",
      element: <NotFound />
   }
])
