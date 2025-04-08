import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LoadingDonorCard = () => {
   return (
      <Card className="relative w-full bg-[#FFFFFF] py-8 px-5 flex flex-col items-center border-none rounded-[8px]"
         style={{ boxShadow: "0px 0px 30px 0px #4242421A" }}>

         <Skeleton className="rounded-lg w-[152px] h-[152px] mb-4" />

         <Skeleton className="h-6 w-[120px] mb-2" />
         <div className="flex items-center w-full justify-center">
            <Skeleton className="h-5 w-5 rounded-full mr-1" />
            <Skeleton className="h-4 w-[100px]" />
         </div>
      </Card>
   )
}

export default LoadingDonorCard
