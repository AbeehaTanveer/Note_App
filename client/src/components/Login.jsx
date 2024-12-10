import React, { useContext, useState } from 'react'
import { handleError, handleSuccess } from "../Logics/Toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { SearchValueContext } from '../context/SearchContext';
const Login = () => {
const { setLoggedIn } = useContext(SearchValueContext);

  const naviagte=useNavigate()
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setloginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleLogin=async(e)=>{
  e.preventDefault();
  setIsLoading(true); 
    
 try {
 const res=await axios.post("http://localhost:8080/login",loginData)
 console.log(res.data)
 handleSuccess("Login Success !")
 const {success,Fname,token}=res.data;
 setLoggedIn(false)
 if(success){
  localStorage.setItem("name",Fname)
  localStorage.setItem("jwt",token)
 }

 setTimeout(() => {
  naviagte('/home')
 }, 1000);

  
 } catch (error) {
  handleError("Login Failed")
  console.log(error)
 }finally {
  setIsLoading(false); // Stop loading
}

}


  return (
    <div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Sign in</h1>
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
            <span>or use your account</span>
            <input onChange={handleChange} value={loginData.email} name='email' type="email" placeholder="Email" />
            <input onChange={handleChange} value={loginData.password} name='password' type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button onClick={handleLogin}  disabled={isLoading}>{isLoading ? "Signing In..." : "Sign In"}</button>
          </form>
        </div>
    </div>
  )
}

export default Login
