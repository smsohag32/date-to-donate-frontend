
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const CallNowButton = ({ phone }) => {
   const { user } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   const handleCallClick = () => {
      if (!user?._id) {
         navigate("/login", { state: { from: location.pathname } });
      } else {
         window.location.href = `tel:${phone}`;
      }
   };

   return (
      <div className="w-full">  <Button
         className="w-full bg-red-500 hover:bg-red-600 text-white transition-all"
         onClick={handleCallClick}
      >
         <Phone className="w-4 h-4 mr-2" />
         Call Now
      </Button>
      </div>
   );
};

export default CallNowButton;
