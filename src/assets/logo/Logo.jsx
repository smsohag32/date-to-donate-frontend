import logoImage from "@/assets/logo/logo.png"
const Logo = ({ ...props }) => {
   return (
      <div>
         <img className="max-w-[180px]" src={logoImage} {...props} alt="Logo" />
      </div>
   );
};

export default Logo;
