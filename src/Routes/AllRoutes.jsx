import React from "react";
import { Routes, Route } from "react-router-dom";
import AddNew from "../Pages/AddNew";
import DashBoards from "../Pages/DashBoards";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import UpdateDelete from "../Pages/UpdateDelete";
import ProtectedRoute from "./ProtectedRoute";
const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashBoards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update"
        element={
          <ProtectedRoute>
            <UpdateDelete />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddNew />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<h1>Page Not Found : ERROR 404.</h1>} />
    </Routes>
  );
};

export default AllRoutes;
