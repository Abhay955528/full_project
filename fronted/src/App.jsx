import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Home from './pages/Home'
import Logout from './pages/Logout'
import Settings from './pages/Settings'
import Admin from './pages/Admin'
import Protected from './components/Protected'


function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/settings" element={<Protected><Settings /></Protected>} />
        <Route path="/home" element={<Protected><Home /></Protected>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App
