import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {

    const navigate = useNavigate();
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    const [values, setValues] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    // useEffect(() => {
    //   if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    //     navigate("/");
    //   }
    // }, []);
  
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
  
    const handleValidation = () => {
      const { password, confirmPassword, username, email } = values;
      if (password !== confirmPassword) {
        toast.error(
          "Password and confirm password should be same.",
          toastOptions
        );
        return false;
      } else if (username.length < 3) {
        toast.error(
          "Username should be greater than 3 characters.",
          toastOptions
        );
        return false;
      } else if (password.length < 8) {
        toast.error(
          "Password should be equal or greater than 8 characters.",
          toastOptions
        );
        return false;
      } else if (email === "") {
        toast.error("Email is required.", toastOptions);
        return false;
      }
  
      return true;
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (handleValidation()) {
        const { email, username, password } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
  
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      }
    };
  
    return (
      <>
        <FormContainer>
          <form action="" onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
              <img  src={Logo} alt="logo" />
              <h1>Howdy</h1>
            </div>
           
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Create User</button>
            <span>
              Already have an account ? <Link to="/login">Login.</Link>
            </span>
            
          </form>
        </FormContainer>
        <ToastContainer />
      </>
    );
  }
  
  const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
     background-color: #ff3f9f;
    .brand {
      display: flex;
      align-items: center;
      gap: 0rem;
      justify-content: center;
      margin-bottom : -2rem;
      img {
      height: 7.5rem;
      margin-right : -1.4rem
      
    }
      h1 {
        color: black;
        text-transform: uppercase;
      }
    }
  
    form {
      height : 77vh;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: #ffa9d4;
      border-radius: 2rem;
      padding: 2rem 4rem;
      
    }
   
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #c30061;
      border-radius: 0.4rem;
      color: black;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #610030;
        outline: none;
      }
    }
    button {
      background-color: #720039;
      color: white;
      padding: 1rem 2rem;
      align-items : center;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      &:hover {
        background-color: #bb437e;
      }
    }
    span {
      color: black;
      text-transform: uppercase;
      a {
        color: #720039;
        text-decoration: none;
        font-weight: bold;
      }
    }
  `;
