import useAuth from "@/hooks/useAuth";

const Profile = () => {
   const { user } = useAuth()
   console.log(user);
   return (
      <div>

      </div>
   );
};

export default Profile;
