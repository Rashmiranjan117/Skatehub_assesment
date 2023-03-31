import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Box, Button, Text, Heading } from "@chakra-ui/react";
import "./styles/update.css";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import UpdateModal from "../Components/UpdateModal";

const buyerGetData = (token) => {
  return axios({
    method: "GET",
    url: "https://super-lime-vest.cyclic.app/buy/",
    headers: {
      Authorization: token,
    },
  });
};

const DelteData = (id, token, endpoint) => {
  return axios({
    method: "DELETE",
    url: `https://super-lime-vest.cyclic.app/${endpoint}/update/${id}`,
    headers: {
      Authorization: token,
    },
  });
};

const sellerGetData = (token) => {
  return axios({
    method: "GET",
    url: "https://super-lime-vest.cyclic.app/sell/",
    headers: {
      Authorization: token,
    },
  });
};

const UpdateDelete = () => {
  const [buyer, setBuyer] = useState([]);
  const [seller, setSeller] = useState([]);
  const cookie = new Cookies();
  const token = cookie.get("authtoken");

  const handleGet = () => {
    buyerGetData(token)
      .then((res) => {
        setBuyer(res.data);
      })
      .catch((err) => console.warn(err));
    sellerGetData(token)
      .then((res) => {
        setSeller(res.data);
      })
      .catch((err) => console.warn(err));
  };

  const handleDelete = (id, endpoint) => {};
  useEffect(() => {
    handleGet();
  }, []);
  return (
    <Box className="edit">
      <Box className="seller">
        {seller &&
          seller?.map((el) => {
            return (
              <Box key={el._id} className="cards">
                <Text>Price : {el.price}</Text>
                <Text>Quantity : {el.quantity}</Text>
                {/* <AiOutlineDelete onClick={(e) => handleDelete(el._id, "sell")} /> */}
                {/* <UpdateModal endpoint="sell" id={el._id} /> */}
              </Box>
            );
          })}
      </Box>
      <Box className="buyer">
        {buyer &&
          buyer?.map((el) => {
            return (
              <Box key={el._id} className="cards">
                <Text>Price : {el.price}</Text>
                <Text>Quantity : {el.quantity}</Text>
                <AiOutlineDelete onClick={(e) => handleDelete(el._id, "buy")} />
                <UpdateModal endpoint="buy" id={el._id} />
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default UpdateDelete;
