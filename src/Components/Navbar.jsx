import React from "react";
import "./styles/nav.css";
import { Link } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box className="nav">
      <Heading className="white_col">Product Probe</Heading>
      <Link className="white_col" to="/">Dashboards</Link>
    </Box>
  );
};

export default Navbar;
