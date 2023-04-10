import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import "./index.css";
import userDetails from '../../../services/signup.json';
import {
    minMaxLength,
    validEmail,
    passwordStrength,
    userExists,
  } from '../Validation';
import { signup } from "../../../services/ApiService";

/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function UserDetails() {
    const [user, setUser] = useState({});
    const [formErrors, setFormErrors] = useState({"username":"","password":"", "mobileNumber":""});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let currentErrors = formErrors;
  switch (name) {
    
    case 'username':
        if (minMaxLength(value, 2,64)) {
            console.log("dsd")
            currentErrors[
              name
            ] = 'Username should have minimum 2 characters';
          } else {
            currentErrors[name] = '';
            setFormErrors(currentErrors);
          }
          console.log(formErrors)
          break;
    case 'mobileNumber':
        if (minMaxLength(value, 10)) {
            console.log("dsd")
            currentErrors[
              name
            ] = 'Mobile Number should have minimum 10 characters';
          } else {
            currentErrors[name] = '';
          }
          console.log(formErrors)
          break;
    case 'email':
        if (!value || validEmail(value)) {
            currentErrors[name] = `Email address is invalid`;
          } else {
            userExists(value).then((result) => {
              if (result) {
                currentErrors[name] =
                  'The email is already registered. Please use a different email.';
              } else {
                delete currentErrors[name];
                setUser({
                    ...user,
                    username: value,
                  });
              }
            });
        }
                
      break;
    case 'password':
        if (minMaxLength(value, 6)) {
            currentErrors[name] = 'Password should have minimum 6 characters';
          } else if (passwordStrength(value)) {
            currentErrors[name] =
              'Password is not strong enough. Include an upper case letter, a number or a special character to make it strong';
          
            } else {
           currentErrors[name] ='';
           setFormErrors(currentErrors);
            setUser({
              ...user,
              password: value,
            });
            if (user.confirmpassword) {
              validateConfirmPassword(
                value,
                user.confirmpassword,
                currentErrors
              );
            }
          }
                
      break;
    case 'confirmpassword':
        let valid = validateConfirmPassword(
            user.password,
            value,
            currentErrors
          );
          if (valid) {
            setUser({ ...user, confirmpassword: value });
          }
         break;
                
      break;
    default:
      break;
  }
  setFormErrors(currentErrors);
  
  }

  function validateConfirmPassword(
    password,
    confirmpassword,
    formErrors
  ) {
    formErrors = formErrors || {};

    if (password !== confirmpassword) {
      formErrors.confirmpassword =
        'Confirmed password is not matching with password';
      return false;
    } else {
      delete formErrors.confirmpassword;
      return true;
    }
  }

  const formValid = ({ isError, ...rest }) => {
    let isValid = false;
    
    Object.values(formErrors).forEach(val => {
        if (val.length > 0) {
            isValid = false
        } else {
            isValid = true
        }
    });
    Object.values(user).forEach(val => {
        if (val === null) {
            isValid = false
        } else {
            isValid = true
        }
    });
    return isValid;
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        console.log(formErrors);
        if (formValid(user)) {
           // console.log(this.state)
        } else {
            console.log("Form is invalid!");
        }
      //  if (userLogin.username.trim() && userLogin.password.trim()) {
          //  const { username, password } = userLogin;
             signup(userDetails)
             .then(res => {
                 console.log("user created")
             })
             .catch(err => {
                 toast.error('Login Failed!!!')
             })
       // }
    };

    useEffect(()=>{
      
    },[]);
    return (
        <>
       
        <div className="form-container">
        <div className="title"> Sign Up</div>
      <form className="userDetails-form" onSubmit={handleSubmit} noValidate >
        <div className="form-elements">
        <div className="mb-3 form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input  type="text" 
              name="username"
              className={formErrors.username.length > 0 ? "is-invalid form-control form-fixer" : "form-control form-fixer"}
              onChange={handleChange}
              id="username"  
              placeholder="Please enter username" required 
              noValidate
              />
                {formErrors.username.length > 0 && (
                        <span className="invalid-feedback">{formErrors.username}</span>
                    )}
          </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input  type="password" 
              name="password"
              className={formErrors.password.length > 0 ? "is-invalid form-control form-fixer" : "form-control form-fixer"}
              onChange={handleChange} id="password" 
              placeholder="Please enter password" required  noValidate/>
              {formErrors.password.length > 0 && (
                        <span className="invalid-feedback">{formErrors.password}</span>
                    )}
            </div> 
            <div className="mb-3">
              <label htmlFor="mobilenumber" className="form-label">Mobile Number</label>
              <input  
              
              type="text" name="password"
              className={formErrors.mobileNumber.length > 0 ? "is-invalid form-control form-fixer" : "form-control form-fixer"}
              onChange={handleChange} id="mobilenumber"
               placeholder="Please enter mobile number" required noValidate />
              <div className="invalid-feedback">
        Please choose a username.
      </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
             
               type="email" className="form-control" id="email" 
               placeholder="Please enter email address" required noValidate />
               <div className="invalid-feedback">
        Please choose a username.
      </div>
            </div> 
            {/* <div className="mb-3">
              <label htmlFor="identificationType" className="form-label">Identification Type</label>
              <input  
             
               type="text" className="form-control" id="identificationType"  
               placeholder="Please enter identification type" required noValidate />
              <div className="invalid-feedback">
        Please choose a username.
      </div>
            </div> 
            <div className="mb-3">
              <label htmlFor="identificationNumber" className="form-label">Identification Number</label>
              <input  
              type="text" className="form-control" 
              id="identificationNumber" placeholder="Please enter identification number" required  noValidate/>
              <div className="invalid-feedback">
        Please choose a username.
      </div>
            </div> 
            <div className="mb-3">
              <label htmlFor="identificationExpiry" className="form-label">Identification Expiry Date</label>
              <input  
               type="text" className="form-control" required  noValidate id="identificationExpiry" placeholder="Please enter identification expiry date" />
              <div className="invalid-feedback">
        Please choose a username.
      </div>
            </div>  */}
      
            </div>
            <div className="button-container">
            <button type="button"  className="btn btn-light cancel">Cancel</button>
              <button type="submit"  className="btn btn-primary action">Next</button>
            </div>
      
      </form>
      </div>
       </> 
    );
}

export default UserDetails;


