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
    url: "https://super-lime-vest.cyclic.app/buy/",
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
const DashBoards = () => {
  const [buyer, setBuyer] = useState([]);
  const [seller, setSeller] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const cookie = new Cookies();
  const token = cookie.get("authtoken");

  const handleCompleted = (buyer, seller) => {
    setCompleted(
      buyer?.filter((el, i) => {
        if (
          el.price === seller[seller.indexOf(el.price)] ||
          el.price === seller[seller.indexOf(el.price + 1)] ||
          el.price === seller[seller.indexOf(el.price - 1)]
        ) {
          setToBeDeleted([...toBeDeleted, el.id, seller[i].id]);
        }
      })
    );
    console.log("completed", completed);
  };

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
  // console.log(buyer, seller);
  useEffect(() => {
    handleGet();
    handleCompleted(buyer, seller);
  }, []);

  return (
    <Box className="dashboards">
      <Box className="top">
        <Box className="left">
          <TableContainer>
            <Table className="table" variant="striped" colorScheme="cyan">
              <TableCaption>Pending Order Table</TableCaption>
              <Thead>
                <Tr>
                  <Td>Seller Qty.</Td>
                  <Td>Seller Price</Td>
                </Tr>
              </Thead>
              <Tbody>
                {seller &&
                  seller
                    ?.map((el) => {
                      return (
                        <Tr key={el._id}>
                          <Td>{el.quantity}</Td>
                          <Td>{el.price}</Td>
                        </Tr>
                      );
                    })
                    .sort((a, b) => a.price - b.price)}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box className="right">
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
                  buyer
                    ?.map((el) => {
                      return (
                        <Tr key={el._id}>
                          <Td>{el.quantity}</Td>
                          <Td>{el.price}</Td>
                        </Tr>
                      );
                    })
                    .sort((a, b) => a.price - b.price)}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Box className="bottom">
        {completed.length > 0 ? (
          <TableContainer>
            <Table className="table" variant="striped" colorScheme="cyan">
              <TableCaption>Completed Order Table</TableCaption>
              <Thead>
                <Tr>
                  <Td>Completed Qty.</Td>
                  <Td>Completed Price</Td>
                </Tr>
              </Thead>
              <Tbody>
                {completed &&
                  completed?.map((el) => {
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
        ) : (
          <Heading>No Matching Data Available!</Heading>
        )}
      </Box>
    </Box>
  );
};

export default DashBoards;
