import logoImage from "@/assets/logo/logoRegular.png"
const LogoRegular = ({ ...props }) => {
   return (
      <div>
         <img className="max-w-[180px]" src={logoImage} {...props} alt="Logo" />
      </div>
   );
};

export default LogoRegular;
