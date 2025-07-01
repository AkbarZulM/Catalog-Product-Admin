import { useRef, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import { updateProduct } from "../service/Product";
import Swal from "sweetalert2";

const UpdateProductModal = ({ isOpen, closeModal, product_id }) => {
  const modalRef = useRef(null);

  const fetchProductsUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      const fileInput = document.getElementById("file-upload");

      // Ambil value dari input
      const name = e.target.name.value.trim();
      const price = e.target.price.value.trim();
      const qty = e.target.qty.value.trim();
      const desc = e.target.desc.value.trim();

      if (!name || !price || !qty || !desc) {
        Swal.fire({
          icon: "warning",
          title: "Form Tidak Lengkap",
          text: "Semua field wajib diisi.",
        });
        return;
      }

      formData.append("name", name);
      formData.append("price", price);
      formData.append("qty", qty);
      formData.append("desc", desc);

      if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
      }

      // Debug isi FormData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await updateProduct(product_id, formData);

      if (response) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Produk berhasil diperbarui!",
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-[#BB8760] text-white rounded-sm pl-4 pr-4 pt-2 pb-2 cursor-pointer",
          },
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      console.log("Response error:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan server.",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40">
      <div className="relative p-4 w-full max-w-2xl max-h-full" ref={modalRef}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Update Product
            </h3>
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              ✕
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <form
              method="POST"
              className="flex flex-col gap-6"
              encType="multipart/form-data"
              onSubmit={fetchProductsUpdate}
            >
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-[280px] p-2 bg-[#F4F5F9] rounded-lg border border-[#DBDCDE] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="w-[300px] p-2 bg-[#F4F5F9] rounded-lg border border-[#DBDCDE] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="qty">Quantity</label>
                  <input
                    type="text"
                    name="qty"
                    id="qty"
                    className="w-[280px] p-2 bg-[#F4F5F9] rounded-lg border border-[#DBDCDE] focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="desc">Description</label>
                  <input
                    type="text"
                    name="desc"
                    id="desc"
                    className="w-[300px] p-2 bg-[#F4F5F9] rounded-lg border border-[#DBDCDE] focus:outline-none"
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (max. 800x400px)
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    name="image"
                    accept="image/*"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-[#BB8760] text-white px-6 py-2 rounded-sm"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-gray-400 px-6 py-2 rounded-sm text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
