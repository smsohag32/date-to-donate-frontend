import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
   return twMerge(clsx(inputs));
}

export const scrollToSection = (sectionId) => {
   const section = document.getElementById(sectionId);
   if (section) {
      section.scrollIntoView({
         behavior: "smooth",
         block: "start",
      });
   }
};
