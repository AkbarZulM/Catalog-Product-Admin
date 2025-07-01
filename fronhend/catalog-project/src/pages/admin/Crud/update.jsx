import { UploadCloud } from "lucide-react";

const Update = () => {
  return (
    <>
      <div className="mt-1 pl-6">
        <div className="pt-6">
          <div className="flex gap-6 items-center">
            <h2 className="text-[25.63px] font-bold text-[#BB8760]">
              Form Product
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
          <div className="bg-white w-[900px] h-auto shadow-xl rounded-lg drop-shadow mt-[3rem]">
            <div className="w-full h-auto flex flex-col pl-6">
              <div className="flex flex-col gap-2 mt-6 pl-6">
                <h2 className="text-[25.63px]">Update Product</h2>
                <h3 className="text-[20px] text-[#89868D]">
                  Update New Product
                </h3>
              </div>
              <form
                action=""
                className="mt-6 pl-6 flex flex-col gap-6"
                encType="multipart/form-data"
              >
                {/* grup input */}
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-[400px] p-2 bg-[#F4F5F9] rounded-lg border-1 border-[#DBDCDE] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-[400px] p-2 bg-[#F4F5F9] rounded-lg border-1 border-[#DBDCDE] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex  gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-[400px] p-2 bg-[#F4F5F9] rounded-lg border-1 border-[#DBDCDE] focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name=""
                      id=""
                      className="w-[400px] p-2 bg-[#F4F5F9] rounded-lg border-1 border-[#DBDCDE] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-[820px] h-64 border-2 border-dashed border-[#E4C59E] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-10 h-10 text-[#BB8760]" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/jpg, image/gif, image/svg+xml"
                    />
                  </label>
                </div>
                <div className="flex gap-2 self-end pr-9 mb-6">
                  <button className="py-1 px-10 border-1 border-[#BB8760] rounded-sm text-[#BB8760] cursor-pointer">
                    cancel
                  </button>
                  <button className="py-1 px-10 bg-[#BB8760] rounded-sm text-white cursor-pointer">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Update;
