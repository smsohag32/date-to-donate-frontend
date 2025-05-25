
import { Droplet, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {
   return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
         <div className="mx-auto max-w-md space-y-6">
            {/* Blood drop icon */}
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
               <Droplet className="h-12 w-12 text-red-500" />
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">404</h1>
            <h2 className="text-xl font-semibold text-gray-900">Page Not Found</h2>

            <p className="text-base text-gray-600">
               The page you&apos;re looking for doesn&apos;t exist or has been moved. Your willingness to donate blood can still save
               lives!
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
               <Button asChild variant="default" className="gap-2 bg-red-600 hover:bg-red-700">
                  <Link to="/">
                     <Home className="h-4 w-4" />
                     Back to Home
                  </Link>
               </Button>
               <Button asChild variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50">
                  <Link to="/auth/login">
                     <Droplet className="h-4 w-4" />
                     Donate Now
                  </Link>
               </Button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
               <p>
                  Need help?{" "}
                  <Link to="/contact-us" className="text-red-600 hover:underline">
                     Contact our support team
                  </Link>
               </p>
            </div>
         </div>
      </div>
   )
}
