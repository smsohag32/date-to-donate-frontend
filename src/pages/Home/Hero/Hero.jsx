import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, Users } from 'lucide-react';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./hero.css";

import heroContent from "@/data/hero-content";

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
                  <div className="relative h-full w-full overflow-hidden">
                     <div
                        data-aos="zoom-out"
                        data-aos-duration="1500"
                        className="w-full h-full"
                     >
                        <img
                           src={item.image || "/placeholder.svg"}
                           alt={item.title}
                           className="w-full h-full object-cover transform scale-105 transition-transform duration-10000 hover:scale-100"
                        />
                     </div>
                     <div className="absolute inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
                           <h1
                              data-aos="fade-down"
                              data-aos-duration="1000"
                              data-aos-delay="300"
                              className="text-2xl md:text-5xl lg:text-6xl font-semibold mb-4"
                           >
                              {item.title}
                           </h1>
                           <p
                              data-aos="fade-up"
                              data-aos-duration="1000"
                              data-aos-delay="600"
                              className="text-base sm:text-2xl mb-8"
                           >
                              {item.description}
                           </p>
                           <div className="flex flex-col lg:items-start items-center sm:flex-row justify-center gap-4">
                              <Link
                                 to="/register"
                                 data-aos="fade-right"
                                 data-aos-delay="900"
                                 data-aos-duration="1000"
                                 className="primary-btn w-auto py-4  text-base items-center max-w-[250px] justify-center flex hover:scale-105 transition-transform"
                              >
                                 <Heart className="mr-2 h-5 w-5 animate-pulse" /> Register now
                              </Link>
                              <Link
                                 to="/find-donor"
                                 data-aos="fade-left"
                                 data-aos-delay="1100"
                                 data-aos-duration="1000"
                                 className="secondary-btn w-auto py-4 text-base  flex max-w-[250px] justify-center items-center hover:scale-105 transition-transform"
                              >
                                 <Users className="mr-2 h-5 w-5 animate-pulse" /> Find Donor
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </SwiperSlide>
            ))}
            <div
               className="autoplay-progress"
               slot="container-end"
               data-aos="fade-in"
               data-aos-duration="1000"
            >
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
