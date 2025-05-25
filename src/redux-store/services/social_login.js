import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const socialLogin = async (credential) => {
   try {
      // Make the API request
      const response = await axios.post(`${BASE_URL}/api/v1/auth/social/sign-in`, credential);
      return response;
   } catch (err) {
      // Ensure a proper message is thrown
      const message = err?.response?.data?.message || "An unexpected error occurred during login.";
      throw new Error(message); // Throw error with message
   }
};
