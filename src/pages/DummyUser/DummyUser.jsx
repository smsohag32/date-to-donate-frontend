import { useState } from "react";
import { useRegisterUserMutation } from "@/redux-store/services/user-api";

const DummyUser = () => {
   const [registerUser] = useRegisterUserMutation();
   const [isLoading, setIsLoading] = useState(false);

   const firstNames = [
      "Hamid", "Sadia", "Rifat", "Tanjim", "Mim", "Shuvo", "Nadia", "Emon",
      "Ayesha", "Bashir", "Tania", "Rakib", "Farzana", "Jahid", "Lamia", "Tanvir",
      "Papia", "Asif", "Shakib", "Rumi"
   ];

   const lastNames = [
      "Hosen", "Akter", "Rahman", "Hasan", "Islam", "Ahmed", "Sultana", "Khan",
      "Noor", "Uddin", "Karim", "Mia", "Chowdhury", "Hossain", "Begum", "Mahmud",
      "Alam", "Nahar", "Kabir", "Rashid"
   ];

   const addresses = [
      "Mirpur, Dhaka", "Dhanmondi, Dhaka", "Gulshan, Dhaka", "Uttara, Dhaka",
      "Bashundhara, Dhaka", "Banani, Dhaka", "Motijheel, Dhaka", "Lalbagh, Dhaka",
      "Khilgaon, Dhaka", "Mohakhali, Dhaka", "Chawkbazar, Chittagong",
      "Agrabad, Chittagong", "Panchlaish, Chittagong", "Kotwali, Chittagong",
      "Zindabazar, Sylhet", "Ambarkhana, Sylhet", "Beanibazar, Sylhet",
      "Rajshahi Sadar, Rajshahi", "Khulna City, Khulna", "Barisal City, Barisal"
   ];

   const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

   const getRandomElement = (arr) => {
      return arr[Math.floor(Math.random() * arr.length)];
   };

   const handleRegister = async () => {
      setIsLoading(true);
      for (let i = 0; i < 20; i++) {
         const firstName = getRandomElement(firstNames);
         const lastName = getRandomElement(lastNames);
         const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i + 1}@gmail.com`;
         const phone = `01922${(100000 + i).toString().slice(-5)}`;
         const address = getRandomElement(addresses);
         const blood_group = getRandomElement(bloodGroups);

         const user = {
            first_name: firstName,
            last_name: lastName,
            email,
            password: "11223344",
            phone,
            blood_group,
            address,
            role: "user"
         };

         try {
            const response = await registerUser(user).unwrap();
            console.log(`✅ ${firstName} registered:`, response);
         } catch (error) {
            console.error(`❌ Error registering ${firstName}:`, error);
         }
      }
      setIsLoading(false);
   };

   return (
      <div className="p-4">
         <button
            onClick={handleRegister}
            className={`px-4 py-2 rounded shadow ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
               } text-white`}
            disabled={isLoading}
         >
            {isLoading ? "Registering Users..." : "Register 20 Dummy Users"}
         </button>

         {isLoading && (
            <p className="mt-4 text-blue-600 font-semibold">Please wait, creating users...</p>
         )}
      </div>
   );
};

export default DummyUser;
