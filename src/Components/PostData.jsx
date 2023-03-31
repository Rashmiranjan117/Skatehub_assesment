import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Heading,
  Text,
  Button,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./styles/add.css";

const postBuyer = (payload, token) => {
  return axios({
    method: "POST",
    url: "http:localhost:8080/buy/add",
    data: JSON.stringify(payload),
    headers: {
      Authorization: token,
    },
  });
};

const postSeller = (payload, token) => {
  return axios({
    method: "POST",
    url: "http:localhost:8080/sell/add",
    data: JSON.stringify(payload),
    headers: {
      Authorization: token,
    },
  });
};

const PostData = () => {
  const [price, SetPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState("");
  const cookie = new Cookies();
  const token = cookie.get("authtoken");
  const toast = useToast();

  const handlePostBuyer = (payload) => {
    postBuyer(payload, token)
      .then((res) => {
        toast({
          title: "Data Added in Database.",
          isClosable: "true",
          duration: 5000,
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Something went wrong.",
          isClosable: "true",
          duration: 5000,
          status: "error",
        });
      });
  };

  const handlePostSeller = (payload) => {
    postBuyer(payload, token)
      .then((res) => {
        toast({
          title: "Data Added in Database.",
          isClosable: "true",
          duration: 5000,
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Something went wrong.",
          isClosable: "true",
          duration: 5000,
          status: "error",
        });
      });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    let payload = { price, quantity };
    if (type === "buyer") {
      handlePostBuyer(payload);
    } else if (type === "seller") {
      handlePostSeller(payload);
    }
  };
  return (
    <Box className="post-form">
      <form onSubmit={handleAdd}>
        <FormControl>
          <FormLabel>Quantity</FormLabel>
          <Input
            type="Number"
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <FormHelperText>Enter Quantity in Number</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            type="Number"
            placeholder="Price"
            onChange={(e) => SetPrice(e.target.value)}
          />
          <FormHelperText>Enter Price in Number</FormHelperText>
        </FormControl>
        <FormLabel>Role.</FormLabel>
        <Select
          placeholder="Select role"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </Select>
        <Button type="submit" colorScheme="blue" variant="solid">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default PostData;
