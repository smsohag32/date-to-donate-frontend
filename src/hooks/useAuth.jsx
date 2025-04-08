
import { useSelector } from 'react-redux';

const useAuth = () => {
   const { user, token, isLoading, error } = useSelector((state) => state.auth);
   return { user, token, isLoading, error }
};

export default useAuth;
