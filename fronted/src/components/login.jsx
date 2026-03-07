import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAddLoginMutation } from '../services/slice';

function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useAddLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password }).unwrap();
      alert(response.message || 'Login Successful');
      localStorage.setItem('token', response.token);
      navigate("/dashboard");
    } catch (error) {
      console.error('Login Error:', error);
      alert(error.data?.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Register Link */}
        <p className="text-center mt-4 text-sm">
          Don’t have an account?{' '}
          <NavLink
            to="/register"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Register
          </NavLink>
          ||
          <NavLink
            to="/admin"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Admin
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;