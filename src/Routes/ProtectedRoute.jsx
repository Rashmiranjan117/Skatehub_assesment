import React from "react";
import Cookies from "universal-cookie";
import { useToast } from "@chakra-ui/react";
import { useNavigate, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const cookie = new Cookies();
  const toast = useToast();
  const navigate = useNavigate();
  const token = cookie.get("authtoken");
  console.log(token);
  if (!token) {
    toast({
      status: "warning",
      isClosable: true,
      duration: 9000,
      title: "Login First!",
      variant: "solid",
    });
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
