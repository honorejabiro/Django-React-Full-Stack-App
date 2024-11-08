import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import {Navigate} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPageFound from "./pages/NoPageFound";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  const Logout = () =>{
    localStorage.clear()
    return <Navigate to="/login" />
  }

  const RegisterAndLogout = () => {
    localStorage.clear()
    return <Register />
  }
  const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoPageFound />} />
        <Route path="/logout" element={<Logout />} />
    </>
  ))
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
