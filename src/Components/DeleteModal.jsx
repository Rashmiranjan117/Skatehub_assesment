import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "universal-cookie";

const DelteData = (id, token, endpoint) => {
  const cookie = new Cookies();
  const token = cookie.get("authtoken");
  return axios({
    method: "DELETE",
    url: `https://super-lime-vest.cyclic.app/${endpoint}/update/${id}`,
    headers: {
      Authorization: token,
    },
  });
};

const DeleteModal = () => {
  return <div></div>;
};

export default DeleteModal;
