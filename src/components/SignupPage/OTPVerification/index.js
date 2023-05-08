import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";
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
function OTPVerification(props) {
  const {step, handleUpdate, nextStep, prevStep, personnalDetailsValue, signUpJson } = props;
  console.log(JSON.stringify(signUpJson));
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
      step: 2,
      otp: '',
      formErrors: {otp: '', lastName: '', middleName: ''},
      otpValid: false,
      formValid: false
    });
   

    const handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setForm(values => ({...values, [name]: value}))
      console.log(form)

      validateField(name, value);
    }

  const validateField = (fieldName, value) => {
      let fieldValidationErrors = form.formErrors;
      let otpValid = form.otpValid;
  
      switch(fieldName) {
        
        case 'otp':
          otpValid = value.length >= 2;
          fieldValidationErrors.otp = otpValid ? '': 'first name should have minimum 2 characters';
          break;
          default:
          break;
      }
      setForm(values => ({...values, formErrors: fieldValidationErrors,
        otpValid:otpValid}))
     
                     validateForm();
                    
                    
    }

 const validateForm = () => {
 // form.formValid= form.emailValid && form.passwordValid;
  setForm(values => ({...values, formValid: form.otpValid}))
 // setForm(form);
      
    }

   const errorClass=(error)=> {
      return(error.length === 0 ? '' : 'has-error');
    }


    const onSignup = () => {
      nextStep(form, 'otp');
      

    }

    const navigateTo =(path) =>{
        navigate('/');
      }

      const redirectTo = () =>{
        handleUpdate(1);
      }
  

    useEffect(()=>{
        if(personnalDetailsValue!=null){
            setForm(personnalDetailsValue);
          }
    },[]);
    return (
        <>

<form className="demoForm">
<div className="form-container">
        <div className="title"> Sign Up</div>

        {/* <div className="otp-label" style={{textAlign:'center', paddingBottom:'10px', fontSize: '15px'}}>OTP Verification</div>
         */}<div className={`form-group form-elements ${errorClass(form.formErrors.otp)}`}>
          <label htmlFor="otp" className="form-label">Please enter otp sent to +919884313282</label>
          <input type="text" className={form.formErrors.otp.length > 0 ? "is-invalid form-control" : "form-control"} name="otp"
            placeholder="Please enter otp"
            value={form.otp}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.otp}</div>
                    }
        </div>
       
        
       
        
        <div className="btn-container">
            <button type="button"  className="btn btn-light cancel" onClick={()=>redirectTo('userDetails')}>Back</button>
              <button type="button"  className="btn btn-primary action"   onClick={(e)=>onSignup()}>Verify OTP</button>
              {/* <button type="button"  className="btn btn-primary action" disabled={!form.formValid}  onClick={(e)=>onSignup(signupjson)}>Verify OTP</button>
               */}
            </div>
            <div className="re-send-container">
            <button disabled={!form.formValid}
                type="button"
                className="btn btn-link link-color resend">
                Re-send OTP
              </button>
              </div>
        </div>
        
      </form>
       </> 
    );
}

export default OTPVerification;


