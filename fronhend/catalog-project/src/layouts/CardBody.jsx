import CardImage from "./CardImage";

const CardBody = ({ name, qty, price, desc, img }) => {
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="flex flex-col gap-4 shadow-lg p-4 items-center border-1 border-[#E4C59E] rounded-lg">
      <div className="flex justify-between w-full">
        <span className="bg-[#BB8760] p-2 rounded-lg">
          <h3 className="text-[15px] text-white">{name}</h3>
        </span>
        <span className="bg-[#BB8760] p-2 rounded-lg">
          <h3 className="text-[15px] text-white">Stock : {qty}</h3>
        </span>
      </div>
      <CardImage img={img} name={name} />
      <div className="flex flex-col gap-6">
        <p className="text-[10px] text-[#89868D]">{desc}</p>
        <h3 className="text-[16px] text-[#BB8760]">
          Price : {formatRupiah(price)}
        </h3>
      </div>
    </div>
  );
};

export default CardBody;
