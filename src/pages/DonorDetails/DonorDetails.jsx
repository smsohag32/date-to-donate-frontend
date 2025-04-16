import { useParams } from "react-router-dom";

const DonorDetails = () => {
   const { donorId } = useParams();

   console.log("Donor ID:", donorId);
   return (
      <div>

      </div>
   );
};

export default DonorDetails;
