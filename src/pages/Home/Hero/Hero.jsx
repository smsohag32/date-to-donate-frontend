
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRef } from "react";
import "./hero.css";

import { Link } from "react-router-dom";
import heroContent from "@/data/hero-content";
import { Heart, Users } from "lucide-react";

const Hero = () => {
   const progressCircle = useRef(null);
   const progressContent = useRef(null);
   const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
   };
   return (
      <div className="hero">
         <Swiper
            style={{
               "--swiper-pagination-color": "#FF2156",
               "--swiper-pagination-bullet-inactive-color": "#999999",
               "--swiper-pagination-bullet-inactive-opacity": "1",
               "--swiper-pagination-bullet-size": "16px",
               "--swiper-pagination-bullet-horizontal-gap": "6px"
            }}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
               delay: 5500,
               disableOnInteraction: false,
            }}
            pagination={{
               clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper"
         >
            {heroContent.map((item) => (
               <SwiperSlide key={item.id}>
                  <div className="relative  w-full">
                     <img src={item.image || "/placeholder.svg"} alt={item.title} className="" />
                     <div className="absolute inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white px-4 sm:px-6 lg:px-8">
                           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">{item.title}</h1>
                           <p className="text-xl sm:text-2xl mb-8">{item.description}</p>
                           <div className="flex flex-col sm:flex-row justify-center gap-4">
                              <Link to="/register" className="primary-btn w-auto  items-center max-w-[250px]  justify-center flex">
                                 <Heart className="mr-2 h-5 w-5" /> Register now
                              </Link>
                              <Link to="/find-donor" className="secondary-btn  w-auto flex max-w-[250px] justify-center  items-center">
                                 <Users className="mr-2 h-5 w-5" /> Find Donor
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
            <div className="autoplay-progress" slot="container-end">
               <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
               </svg>
               <span ref={progressContent}></span>
            </div>
         </Swiper>
      </div>
   );
};

export default Hero;
