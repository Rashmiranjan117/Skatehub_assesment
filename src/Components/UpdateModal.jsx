import React, { useState } from "react";
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
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "universal-cookie";
import { AiOutlineEdit } from "react-icons/ai";

const updateData = (payload, id, token, endpoint) => {
  return axios({
    method: "PATCH",
    url: `http://localhost:8080/${endpoint}/update/${id}`,
    data: JSON.stringify(payload),
    headers: {
      Authorization: token,
    },
  });
};

const UpdateModal = ({ endpoint, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const cookie = new Cookies();
  const token = cookie.get("authtoken");
  const toast = useToast();
  const handleUpdate = () => {
    let payload = { price, quantity };
    updateData(payload, id, token, endpoint)
      .then((res) => {
        toast({
          status: "success",
          title: "Data Updated",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "something went wrong",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Button onClick={onOpen}>
        <AiOutlineEdit />
      </Button>

      <Modal
        isOpen={isOpen}
        closeOnOverlayClick={true}
        size="xl"
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="number"
              placeholder="Enter new price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Enter new Quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button>Update</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateModal;
