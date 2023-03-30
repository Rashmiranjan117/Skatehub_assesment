import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./styles/dashboards.css";
const buyerGetData = (token) => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/buy/",
    headers: {
      Authorization: token,
    },
  });
};

const selletGetData = (token) => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/sell/",
    headers: {
      Authorization: token,
    },
  });
};
const DashBoards = () => {
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
    selletGetData(token)
      .then((res) => {
        setSeller(res.data);
      })
      .catch((err) => console.warn(err));
  };

  useEffect(() => {
    handleGet();
  }, []);
  console.log(buyer, seller);
  return (
    <Box className="dashboards">
      <Box className="top">
        <Box className="left">
          <TableContainer>
            <Table className="table" variant="striped" colorScheme="cyan">
              <TableCaption>Pending Order Table</TableCaption>
              <Thead>
                <Tr>
                  <Td>Buyer Qty.</Td>
                  <Td>Buyer Price</Td>
                </Tr>
              </Thead>
              <Tbody>
                {seller &&
                  seller?.map((el) => {
                    return (
                      <Tr key={el._id}>
                        <Td>{el.quantity}</Td>
                        <Td>{el.price}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table className="table" variant="striped" colorScheme="cyan">
              <TableCaption>Pending Order Table</TableCaption>
              <Thead>
                <Tr>
                  <Td>Buyer Qty.</Td>
                  <Td>Buyer Price</Td>
                </Tr>
              </Thead>
              <Tbody>
                {buyer &&
                  buyer?.map((el) => {
                    return (
                      <Tr key={el._id}>
                        <Td>{el.quantity}</Td>
                        <Td>{el.price}</Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="right"></Box>
      </Box>
      <Box className="bottom"></Box>
    </Box>
  );
};

export default DashBoards;
