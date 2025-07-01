import { motion as Motion } from "framer-motion";
import { registerUser } from "../../service/LoginUser";
import Swal from "sweetalert2";
// import { useState } from "react";

const RegisterPage = () => {
  //   const [message, setMessage] = useState("");
  const Submit = async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;

    try {
      const response = await registerUser(name, email, password, address);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration successful!",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-[#BB8760] text-white rounded-sm pl-4 pr-4 pt-2 pb-2 cursor-pointer",
        },
      }).then(() => {
        window.location.href = "/";
        return response;
      });
    } catch (error) {
      if (error.response) {
        // Server merespons dengan status kode di luar 2xx
        const errorMessage =
          error.response.data.errors || "Terjadi kesalahan saat mendaftar.";
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: errorMessage,
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-[#BB8760] text-white rounded-sm pl-4 pr-4 pt-2 pb-2 cursor-pointer",
          },
        });
      } else if (error.request) {
        // Permintaan dikirim tetapi tidak ada respons
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Tidak ada respons dari server.",
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-[#BB8760] text-white rounded-sm pl-4 pr-4 pt-2 pb-2 cursor-pointer",
          },
        });
      } else {
        // Kesalahan lainnya
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Terjadi kesalahan saat mengirim permintaan.",
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-[#BB8760] text-white rounded-sm pl-4 pr-4 pt-2 pb-2 cursor-pointer",
          },
        });
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Motion.div
        className="flex flex-col items-center justify-center h-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 z-0 rotate-[125deg] left-[-970px] right-[570px] top-[700px]">
          <img
            src="/public/image/bg-coffe.jpg"
            alt=""
            className="object-cover h-screen object-top-left"
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <form method="POST" onSubmit={Submit}>
            <h3 className="text-[25px] font-bold">Sign Up</h3>
            <div className="flex flex-col gap-2 mt-6">
              <input
                type="text"
                className="p-2 w-[330px] rounded-sm bg-[#F4F5F9] border-[#DBDCDE] border-1"
                placeholder="Name...."
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <input
                type="email"
                className="p-2 w-[330px] rounded-sm bg-[#F4F5F9] border-[#DBDCDE] border-1"
                placeholder="Email...."
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <input
                type="password"
                className="p-2 w-[330px] rounded-sm bg-[#F4F5F9] border-[#DBDCDE] border-1"
                placeholder="Password...."
                name="password"
                id="password"
              />
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <input
                type="text"
                className="p-2 w-[330px] rounded-sm bg-[#F4F5F9] border-[#DBDCDE] border-1"
                placeholder="address...."
                name="address"
                id="address"
              />
            </div>
            <button
              type="submit"
              className="p-2 bg-[#BB8760] rounded-sm text-white mt-6 w-full cursor-pointer"
            >
              Sign Up
            </button>
            <div className="flex text-[#89868D] mt-6 gap-2">
              <h4>Already have an account?</h4>
              <a href="/" className="text-[#BB8760]">
                Login
              </a>
            </div>
          </form>
        </div>
      </Motion.div>
    </div>
  );
};

export default RegisterPage;
