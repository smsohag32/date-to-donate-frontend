
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import useAuth from "@/hooks/useAuth";
import Loading from "@/components/skeleton/Loading";
import { logoutUser } from "@/redux-store/slices/auth-slice";

const SecureRoute = ({ userRoles, children }) => {
   const { user, isLoading } = useAuth();
   const location = useLocation();
   const dispatch = useDispatch();

   if (isLoading) {
      return <Loading />;
   }
   // && user?.userType && userRoles?.includes(user.userType)
   if (user && userRoles.includes(user?.role)) {
      return children;
   }
   dispatch(logoutUser());
   return <Navigate to="/login" state={{ from: location }} />;
};

export default SecureRoute;
