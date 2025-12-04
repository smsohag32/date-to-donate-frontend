import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const DownloadTemplate = () => {
   return (
      <div>
         <Button asChild variant="default" className="w-full">
            <a href="/donor_sample.xlsx" download>
               <Download className="mr-2 h-4 w-4" />
               Download Template
            </a>
         </Button>
      </div>
   )
}

export default DownloadTemplate
