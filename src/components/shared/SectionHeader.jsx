import { motion } from "framer-motion"
import { Droplet } from "lucide-react"

/**
 * Reusable Section Header Component for consistent, attractive headers across all pages
 * @param {string} badge - Small pill badge text (e.g. "DIRECT MATCH", "OUR MISSION")
 * @param {string} title - Main title text
 * @param {string} highlight - Highlighted word/phrase in primary red/rose color
 * @param {string} subtitle - Description paragraph
 * @param {string} align - 'center' | 'left'
 * @param {React.ReactNode} children - Extra action buttons or controls (optional)
 * @param {string} className - Extra outer classes
 */
const SectionHeader = ({
   badge,
   title,
   highlight,
   subtitle,
   align = "center",
   children,
   className = "",
}) => {
   const isCenter = align === "center"

   return (
      <div
         className={`relative mb-12 md:mb-16 ${
            isCenter ? "text-center max-w-3xl mx-auto" : "max-w-3xl"
         } ${className}`}
      >
         {badge && (
            <motion.div
               initial={{ opacity: 0, y: -10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.4 }}
               className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-semibold text-xs tracking-wider uppercase mb-3 shadow-xs ${
                  isCenter ? "mx-auto" : ""
               }`}
            >
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
               </span>
               <Droplet className="w-3 h-3 fill-rose-500 text-rose-500" />
               <span>{badge}</span>
            </motion.div>
         )}

         {title && (
            <motion.h2
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.1 }}
               className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]"
            >
               {title}{" "}
               {highlight && (
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-500 to-rose-600">
                     {highlight}
                  </span>
               )}
            </motion.h2>
         )}

         {subtitle && (
            <motion.p
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.2 }}
               className={`mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed ${
                  isCenter ? "max-w-2xl mx-auto" : ""
               }`}
            >
               {subtitle}
            </motion.p>
         )}

         {children && (
            <motion.div
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 0.3 }}
               className={`mt-6 flex flex-wrap gap-3 ${
                  isCenter ? "justify-center" : "justify-start"
               }`}
            >
               {children}
            </motion.div>
         )}
      </div>
   )
}

export default SectionHeader
