import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  // useEffect(() => {
  //   if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/");
  //   }
  // }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("username and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("username and Password is required.", toastOptions);
      return false;
    }
    return true;
  };


    const handleSubmit = async (event) => {
      event.preventDefault();
      if (validateForm()) {
        const { username, password } = values;
        const { data } = await axios.post(loginRoute, {
          username,
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
            <img src={Logo} alt="logo" />
            <h1>Howdy</h1>
          </div>
          
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
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
   margin-bottom : -2rem;
    img {
      margin-top : -0.9rem;
      height: 7.5rem;
      margin-right : -1.4rem
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }

  form {
     height : 50vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #ffa9d4 ;
    border-radius: 2rem;
    padding: 3.5rem;
  }
  
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #c30061;
    border-radius: 0.4rem;
    color: black
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