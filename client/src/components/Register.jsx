import React, { useContext, useState } from "react";
import Swap from "./Swap";
import "./Register.css";
import Login from "./Login";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Logics/Toast";
import { useNavigate } from "react-router-dom";
import { SearchValueContext } from "../context/SearchContext";

const Register = () => {
const { setLoggedIn } = useContext(SearchValueContext);

  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [SignupData, setSignupData] = useState({
    Fname: "",
    email: "",
    password: "",
  });

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const res = await axios.post("http://localhost:8080/signup", SignupData);
      handleSuccess("Sign Up Success!");

      const loginRes=await axios.post("http://localhost:8080/login", {
        email: SignupData.email,
        password: SignupData.password,
      });

 console.log(loginRes.data)
 setLoggedIn(false)

      const { Fname } = res.data.saveData || {};
      const {success}=res.data
      const {token}=loginRes.data
      localStorage.setItem("jwt",token)
      if (success) {
        localStorage.setItem("name", Fname);
        setTimeout(() => navigate("/home"), 1000);
      }
     
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Sign Up Failed";
      handleError(errorMessage);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center mt-[90px]">
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your email for registration</span>
            <input
              onChange={handleChange}
              value={SignupData.Fname}
              name="Fname"
              type="text"
              placeholder="Name"
            />
            <input
              onChange={handleChange}
              value={SignupData.email}
              name="email"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              value={SignupData.password}
              name="password"
              type="password"
              placeholder="Password"
            />
            <button onClick={handleSignup} disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
        <Login />
        <Swap
          handleSignInClick={handleSignInClick}
          handleSignUpClick={handleSignUpClick}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
