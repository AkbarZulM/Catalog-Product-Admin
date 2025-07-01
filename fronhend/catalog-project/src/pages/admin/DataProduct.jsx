import Card from "../../layouts/Card";

const DataProducts = () => {
  return (
    <div className="mt-1 pl-6">
      <div className="pt-6">
        <div className="flex gap-6 items-center">
          <h2 className="text-[25.63px] font-bold text-[#BB8760]">
            Data Products
          </h2>
          <div className="flex relative pl-[80px]">
            <input
              type="text"
              placeholder="  Search anything here..."
              className="rounded-[30px] p-2 bg-white w-[533px] shadow-sm focus:outline-none"
            />
            <span className="absolute top-[10px] right-3">
              <img
                src="/public/image/icons-search.png"
                alt="Search Icon"
                className="object-cover"
              />
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white w-[1200px] h-auto shadow-xl rounded-lg drop-shadow  mt-[3rem]">
          <div className="w-full h-[70px] bg-[#BB8760] flex items-center pl-6">
            <h3 className="text-[25.63px] font-bold text-[#E4C59E]" id="title">
              All Products
            </h3>
          </div>
          <div className="p-6">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataProducts;
