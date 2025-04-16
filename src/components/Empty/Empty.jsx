
import { useEffect, useRef } from "react"
import lottie from "lottie-web"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

const EmptyState = ({
   title,
   description,
   animationPath = "https://assets5.lottiefiles.com/packages/lf20_ydo1amjm.json",
   buttonText = "Schedule Donation",
   buttonLink,
   onButtonClick,
}) => {
   const animationContainer = useRef(null)

   useEffect(() => {
      if (animationContainer.current) {
         const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: animationPath,
         })

         return () => anim.destroy()
      }
   }, [animationContainer, animationPath])

   const handleButtonClick = () => {
      if (onButtonClick) {
         onButtonClick()
      }
   }

   return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
         <Card className="w-full max-w-md border-dashed bg-white/50 shadow-none backdrop-blur-sm">
            <div className="w-full h-48 overflow-hidden" ref={animationContainer}></div>
            <CardContent className="text-center space-y-3 pt-4">
               <h3 className="text-xl font-semibold">{title}</h3>
               <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
            {buttonText && (buttonLink || onButtonClick) && (
               <CardFooter>
                  {buttonLink ? (
                     <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                        <a href={buttonLink}>{buttonText}</a>
                     </Button>
                  ) : (
                     <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleButtonClick}>
                        {buttonText}
                     </Button>
                  )}
               </CardFooter>
            )}
         </Card>
      </div>
   )
}

export default EmptyState
