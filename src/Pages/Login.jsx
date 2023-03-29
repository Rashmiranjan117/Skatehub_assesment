import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Link, useNavigate ,Navigate } from "react-router-dom";
import "./styles/common.css";
import Cookies from "universal-cookie";

const LoginUser = (payload) => {
  return axios.post("http://localhost:8080/auth/login", payload);
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleRegister = (e) => {
    e.preventDefault();
    let payload = { email, password };
    LoginUser(payload)
      .then((res) => {
        toast({
          status: "success",
          title: "Login Successfull",
          isClosable: true,
          duration: 5000,
        });
        let token = res.data.token;
        cookies.set("authtoken", token);
        navigate("/");
        // console.log(token)
        // return <Navigate to='/' />
      })
      .catch((err) => {
        toast({
          status: "error",
          title: `Registration err: ${err}`,
          isClosable: true,
          duration: 5000,
        });
      });
  };
  return (
    <Box className="validation">
      <Heading>Login</Heading>
      <form onSubmit={handleRegister}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            id='password'
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
        </FormControl>
        <Button type="submit" colorScheme="blue" variant="solid">
          Login
        </Button>
      </form>
      <Text className="nav_text">
        Don't have an account? <Link to="/register">Signup</Link>
      </Text>
    </Box>
  );
};

export default Login;
