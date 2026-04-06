import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const CallNowButton = ({ phone, variant, className, size = "default", children }) => {

   const handleCallClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = `tel:${phone}`;
   };

   return (
      <Button
         variant={variant}
         size={size}
         className={className || "w-full bg-red-500 hover:bg-red-600 text-white transition-all"}
         onClick={handleCallClick}
      >
         {children || (
            <>
               <Phone className="w-4 h-4 mr-2" />
               Call Now
            </>
         )}
      </Button>
   );
};

export default CallNowButton;
