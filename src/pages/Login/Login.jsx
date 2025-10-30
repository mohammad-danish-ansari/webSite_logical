import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/userService";
import { showAlert } from "../../utils/alerts";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const navigatePath = (path) => {
    navigate(path);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
      console.log("response----------------login bahar");

  if (
       !formData.email ||
       !formData.password
     ) {
       showAlert.warning("All fields are required.");
      console.log("response----------------login indar");

     }
      console.log("response----------------login");

    try {
      const response = await postLogin({
        email: formData.email,
        password: formData.password,
      });
      console.log(response, "response----------------login");
      const userData = {
        name: response.user.name,
        userId: response.user.id,
        email: response.user.email,
      };
      if (response.message === "Login successful") {
        showAlert.success(response?.message);
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("user", JSON.stringify(userData));
        navigatePath("/")
      } else {
        showAlert.error(response?.message);
      }
    } catch (err) {
      showAlert.error("Failed to log in. Please check your credentials.");
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[350px]">
        <h3 className="text-center text-2xl font-semibold mb-6">User LogIn</h3>

        <form className="space-y-4">
          {/* Email input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="px-3 text-gray-500 bg-gray-100 border-r">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="Enter email address"
                name="email"
                 value={formData.email}
                onChange={handleChange}
                className="w-full p-2 outline-none text-gray-800"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span
                className="px-3 text-gray-500 bg-gray-100 border-r cursor-pointer"
                onClick={togglePassword}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                 name="password"
                 value={formData.password}
                onChange={handleChange}
                className="w-full p-2 outline-none text-gray-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <div className="text-center mt-3 text-sm text-gray-700">
            <p className="mb-1">
              Don’t have an account?{" "}
              <span
                onClick={() => navigatePath("/register")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
            <p className="mb-0">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Forgot Password?
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
