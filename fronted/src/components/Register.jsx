import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAddRegisterMutation } from "../services/slice";

function Register() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useAddRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required");
      return; // stop execution
    }
    try {
      const response = await registerUser({
        name,
        email,
        password,
      }).unwrap();
      alert(response.message);

      navigate("/"); // redirect to login
    } catch (error) {
      alert(error.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <NavLink
            to="/"
            className="text-green-500 font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;