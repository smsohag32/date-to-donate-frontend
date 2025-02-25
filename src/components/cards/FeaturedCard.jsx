
const FeaturedCard = ({ item }) => {
   return (
      <div style={{ boxShadow: "0px 0px 30px 0px #4242421A", }} className="bg-[#FFFFFF] justify-center items-center w-full px-5 pt-5 pb-8 flex flex-col gap-4 rounded-[10px] ">
         <img src={item?.img} className="w-[130px] h-[130px]" alt={item?.name} />
         <p className="text-[#7E7E7E] text-[28px] font-normal">{item?.name}</p>
      </div>
   );
};

export default FeaturedCard;
