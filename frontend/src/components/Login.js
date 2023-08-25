import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { validateEmail } from "../Util/valid";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const initialState = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { email, password } = userData;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.warn("Please enter all the required fields");
    }
    if (!validateEmail(email)) {
      toast.warn("Invalid Email");
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/users/login`,
        { email:email, password:password }
      );
      toast.success("User Logged In successfully");
      localStorage.setItem("HelloAmp", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      console.log(err.response);
      toast.error("Login Failed: Either the email or password is incorrect");
      setLoading(false);
      return;
    }
  };
  return (
    <VStack spacing="30px">
      <FormControl id="loginEmail" isRequired>
        <FormLabel mb="0px">Email</FormLabel>
        <Input
          onChange={handleChange}
          name="email"
          value={email}
          size="md"
          placeholder="Enter Email"
        />
      </FormControl>
      <FormControl id="loginPassword" isRequired>
        <FormLabel mb="0px">Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={handleChange}
            name="password"
            value={password}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="xs"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        bg={"#1d1931"}
        colorScheme={"#1d1931"}
        color="#fff"
        width="100%"
        style={{ marginTop: "40px" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
