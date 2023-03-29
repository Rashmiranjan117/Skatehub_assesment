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
  Heading
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/common.css";

const RegisterUser = (payload) => {
  return axios.post("http://localhost:8080/auth/register", payload);
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    let payload = { email, password };
    RegisterUser(payload)
      .then((res) => {
        toast({
          status: "success",
          title: "Account created Successfully",
          isClosable: true,
          duration: 5000,
        });
        navigate("/login");
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
        <Heading>Signup</Heading>
      <form onSubmit={handleRegister}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            isRequired
          />
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            isRequired
          />
        </FormControl>
        <Button type="submit" colorScheme='blue' variant='solid'>Signup</Button>
      </form>
      <Text className="nav_text">
        Already have an account? <Link to="/login">Login</Link>
      </Text>
    </Box>
  );
};

export default Signup;
