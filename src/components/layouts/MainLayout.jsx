import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import FloatingEmergencyBar from "../shared/FloatingEmergencyBar";

const MainLayout = () => {
   return (
      <div className="scroll-smooth min-h-screen flex flex-col justify-between">
         <Header />
         <main className="min-h-[80vh] flex-grow">
            <Outlet />
         </main>
         <Footer />
         <FloatingEmergencyBar />
         <ScrollRestoration />
      </div>
   );
};

export default MainLayout;
