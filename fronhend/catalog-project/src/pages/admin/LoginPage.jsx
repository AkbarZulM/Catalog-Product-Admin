import { motion as Motion } from "framer-motion";
import { loginUser } from "../../service/LoginUser";
import Swal from "sweetalert2";
const LoginPage = () => {
  const Submit = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const response = await loginUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login successful!",
        buttonsStyling: false,
        customClass: {
          confirmButton:
            "bg-[#BB8760] text-white rounded-sm pl-4 pr-4 pt-2 pb-2 cursor-pointer",
        },
      }).then(() => {
        window.location.href = "/admin/dashboard";
        return response;
      });
    } catch (error) {
      if (error.response) {
        // Server merespons dengan status kode di luar 2xx
        const errorMessage = "Username atau password salah";
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
      }
    }
  };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-10 flex h-full p-55">
          <div className="flex flex-col">
            <div className="flex flex-col gap-1 mb-5">
              <h3 className="text-[35px] font-bold">Login</h3>
              <h4 className="text-[17px] text-[#89868D]">
                How do i get started Login at?
              </h4>
            </div>
            <div>
              <form
                method="post"
                className="flex flex-col gap-2 w-[330px]"
                onSubmit={Submit}
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">email</label>
                  <input
                    type="text"
                    id="email"
                    placeholder="Enter your email"
                    className="p-2 rounded-sm bg-[#F4F5F9] shadow-sm border-[#DBDCDE] border-1 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder=". . . . . . . . . . . . ."
                    className="p-2 rounded-sm bg-[#F4F5F9] shadow-sm border-[#DBDCDE] border-1 focus:outline-none"
                  />
                </div>
                <div className="mt-4 text-[#BB8760] self-end mt-5 mb-5">
                  Forget Password
                </div>
                <button
                  type="submit"
                  className="bg-[#BB8760] text-white p-2 rounded-sm border-none cursor-pointer"
                >
                  Login
                </button>
                <div className="flex gap-2 mt-4 justify-center">
                  <h4 className="text-[#89868D]">Don't have an account?</h4>
                  <a href="/register" className="text-[#BB8760]">
                    Register
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Motion.div>
      <img
        src="/image/bg-coffe.jpg"
        alt=""
        className="absolute top-25 left-190 w-full h-full object-cover rotate-[-50deg] z-0 opeacity-1"
      />
    </div>
  );
};

export default LoginPage;
