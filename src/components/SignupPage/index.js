import React, { useState, useEffect } from "react";
import Header from "../Header";
import "./index.css";
import UserDetails from "./UserDetails";


/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function Signup() {
  // const [inputs, setInputs] = useState({});

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs(values => ({...values, [name]: value}))
  // }


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
      //  if (userLogin.username.trim() && userLogin.password.trim()) {
          //  const { username, password } = userLogin;
            // signup(userDetails)
            // .then(res => {
            //     console.log("user created")
            // })
            // .catch(err => {
            //     toast.error('Login Failed!!!')
            // })
       // }
    // };

    useEffect(()=>{
      
    },[]);
    return (
      <>
      <Header page={'signup'}></Header>
      <div  className="sign-up">
      <div className="signup-container" >

      <UserDetails />
      </div>
      </div>
      </>
        
    );
}

export default Signup;
