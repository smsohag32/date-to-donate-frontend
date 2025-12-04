import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const DownloadTemplate = () => {
   return (
      <div>
         <Button variant={"default"} className={"w-full"}>
            <Download /> Download Template
         </Button>
      </div>
   )
}

export default DownloadTemplate
