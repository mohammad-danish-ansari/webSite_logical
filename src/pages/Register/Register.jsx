import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/userService";
import { showAlert } from "../../utils/alerts";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
const navigatePath = (path) => {
        navigate(path);
    };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      showAlert.warning("All fields are required.");
      return;
    }
    try {
      const response = await postRegister(formData);
      console.log(response, "response--------");
      if (response.message === "User registered successfully") {
        showAlert.success(response.message);
        navigatePath("/login")

      } else {
        showAlert.error(response.message);
      }
    } catch (error) { }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[350px]">
        <h3 className="text-center text-2xl font-semibold mb-5">User Sign Up</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center border rounded-lg px-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="w-full py-2 focus:outline-none"
              />
              <span
                className="cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Sign Up
          </button>

          <div className="text-center mt-3">
            <p className="text-sm">
              Already have an account?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigatePath("login")}>
                Sign In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
