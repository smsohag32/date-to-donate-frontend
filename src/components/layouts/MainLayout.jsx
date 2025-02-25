import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

const MainLayout = () => {
   return (
      <div className="scroll-smooth">
         <Header />
         <div className="min-h-[80vh]">
            <Outlet />
         </div>
         <Footer />
      </div>
   );
};

export default MainLayout;
