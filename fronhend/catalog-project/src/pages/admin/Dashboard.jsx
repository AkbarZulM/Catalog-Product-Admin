import { useEffect, useState } from "react";
import { getProducts } from "../../service/Product";
import { deleteProduct } from "../../service/Product";
import Swal from "sweetalert2";
import ModalCreate from "../../layouts/ModalCreate";

const AdminDashboard = () => {
  const [dataProduct, setGetProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [product_id, setProductId] = useState();

  const toggleModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      const updatedProducts = dataProduct.filter(
        (product) => product.id !== id
      );
      setGetProducts(updatedProducts);
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "data berhasil dihapus!",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-[#BB8760] text-white rounded-sm pl-4 pr-4 pt-2 pb-2 cursor-pointer",
        },
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setGetProducts(products.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="mt-1 pl-6">
      <div className="pt-6">
        <div className="flex gap-6 items-center">
          <h2 className="text-[25.63px] font-bold text-[#BB8760]">Dashboard</h2>
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
      <div className="flex pt-6 gap-2">
        <div className="bg-white w-[1200px] h-[400px] shadow-xl rounded-lg drop-shadow pl-4">
          <h3
            className="text-[25.63px] font-bold text-[#BB8760] py-6 px-6"
            id="title"
          >
            Activitas Catalog Product
          </h3>
          <div className="pt-3 flex gap-4">
            <div className="flex items-center px-6 py-4 gap-4">
              <div className="bg-white w-auto h-auto drop-shadow-xl rounded-lg">
                <div className="flex items-center px-6 pt-4 gap-4 mt-4">
                  <span className="bg-[#E4C59E] p-2 rounded-lg">
                    <img src="/public/image/icon-account.png" alt="" />
                  </span>
                  <h3 className="text-[20px]">Users</h3>
                </div>
                <div className="flex px-6 py-4 gap-4 flex-col pb-6">
                  <span>
                    <h3 className="text-[43px] font-bold">35 K</h3>
                  </span>
                  <div className="w-[200px] bg-[#E4C59E]  rounded-full h-[6px] overflow-hidden">
                    <div className="bg-[#BB8760] h-full w-1/2 rounded-full transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center px-6 py-4 gap-4">
              <div className="bg-white w-auto h-auto drop-shadow-xl rounded-lg">
                <div className="flex items-center px-6 pt-4 gap-4 mt-4">
                  <span className="bg-[#E4C59E] p-2 rounded-lg">
                    <img src="/public/image/icons8-product-35.png" alt="" />
                  </span>
                  <h3 className="text-[20px]">Product</h3>
                </div>
                <div className="flex px-6 py-4 gap-4 flex-col pb-6">
                  <span>
                    <h3 className="text-[43px] font-bold">10 K</h3>
                  </span>
                  <div className="w-[200px] bg-[#E4C59E]  rounded-full h-[6px] overflow-hidden">
                    <div className="bg-[#BB8760] h-full w-1/2 rounded-full transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-[370px] h-[400px] shadow-xl rounded-lg drop-shadow pl-4">
          <div className="flex items-center flex-col px-6 pt-4 gap-2 mt-4">
            <h3 className="self-start text-[23.63px]">Profile Admin</h3>
            <span className="p-2 rounded-lg mt-4">
              <img
                src="/public/image/image-account.png"
                alt=""
                className="object-cover rounded-full w-[130px] h-[130px]"
              />
            </span>
            <h3 className="text-[20px] font-bold">Akbar Vabiansyah</h3>
            <h3 className="text-[13px] opacity-[36%]">Vabiansyaha@gmail.com</h3>
            <p className="justify-center text-[13px] opacity-[36%]">
              Jalan Fiktif No. 123, Kelurahan Khayalan, Kecamatan Imajinasi,
              Kota Mimpi Indah, Provinsi Fantasi. Kode Pos: 98765
            </p>
          </div>
        </div>
      </div>
      <div className="flex pt-6 gap-2">
        <div className="bg-white w-[1573px] h-auto shadow-xl rounded-lg drop-shadow">
          <div className="flex flex-col">
            <div className="items-center mt-6 mb-4">
              <div className="flex relative pl-[20px]">
                <input
                  type="text"
                  placeholder="Search Product Name..."
                  className="rounded-[30px] p-2 bg-white w-[300px] shadow-sm focus:outline-none pl-10 py-3 border-1 border-[#DBDCDE]"
                />
              </div>
            </div>
            <table className="w-full text-md bg-white rounded">
              <tbody>
                <tr className="border-[#DBDCDE] border-b-2">
                  <th className="text-left p-3 px-5">Image</th>
                  <th className="text-left p-3 px-5">Product</th>
                  <th className="text-left p-3 px-5">Price</th>
                  <th className="text-left p-3 px-5">Quantity</th>
                  <th></th>
                </tr>
                {dataProduct.map((product) => (
                  <tr
                    className="border-[#DBDCDE] border-b-1 hover:bg-orange-100"
                    key={product.id}
                    id-product={product.id}
                  >
                    <td className="p-3 px-5">
                      <img
                        src={`http://localhost:5000` + product.img}
                        alt=""
                        className="object-cover rounded-full w-[50px] h-[50px]"
                      />
                    </td>
                    <td className="p-3 px-5">
                      <h3>{product.name}</h3>
                    </td>
                    <td className="p-3 px-5">
                      <h3>{formatRupiah(product.price)}</h3>
                    </td>
                    <td className="p-3 px-5">
                      <h3>{product.qty}</h3>
                    </td>
                    <td className="">
                      <button
                        data-id-product={product.id}
                        onClick={(e) => {
                          e.preventDefault();

                          const id =
                            e.currentTarget.getAttribute("data-id-product");
                          setProductId(id);
                          toggleModal();
                        }}
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        <img
                          src="/public/image/icons8-update-35.png"
                          alt=""
                          className="object-cover rounded-full w-[30px] h-[30px]"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        <img
                          src="/public/image/icons8-delete-25.png"
                          alt=""
                          className="object-cover w-[30px] h-[30px]"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ModalCreate
          isOpen={isOpen}
          closeModal={closeModal}
          toggleModal={toggleModal}
          product_id={product_id}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
