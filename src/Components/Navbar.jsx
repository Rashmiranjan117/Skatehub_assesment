import React from "react";
import "./styles/nav.css";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import Cookies from "universal-cookie";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEdit } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";

const Navbar = () => {
  const cookie = new Cookies();
  const token = cookie.get("authtoken");
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = () => {
    toast({
      status: "success",
      isClosable: true,
      duration: 5000,
      title: "Logout Successfull.",
    });

    cookie.clear("authtoken");
    navigate("/login");
  };
  return (
    <Box className="nav">
      <Heading className="white_col">Product Probe</Heading>

      {token && (
        <Box className="nav_left">
          <Link className="white_col" to="/">
            Dashboards
          </Link>
          <Link className="white_col" to="/add">
            <span>Add</span> <GrFormAdd />
          </Link>
          <Link className="white_col" to="/update">
            <span>Edit/Delete</span> <AiOutlineEdit />
          </Link>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BiUserCircle />}
              variant="solid"
              color="black"
            />
            <MenuList>
              <MenuItem
                background="red"
                icon={<IoExitOutline />}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
