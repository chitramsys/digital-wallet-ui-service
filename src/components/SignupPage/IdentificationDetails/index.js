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
function IdentificationDetails(props) {
  const {step, handleUpdate, nextStep, prevStep, identificationDetailsValue} = props;
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
      step: 3,
      identificationNumber: '',
      identificationType: '',
      expiryDate: '',
      password: '',
      formErrors: {identificationNumber: '', identificationType: '', expiryDate: ''},
      identificationNumberValid: false,
      identificationTypeValid: false,
      expiryDateValid: false,
      formValid: false
    });
    const [signupjson, setSignupjson] =useState({
      "username": "Paramesh123",
         "name": {
             "firstName": "kutty",
             "middleName": "elu",
             "lastName": "test"
         },
         "password": "newpassword3",
         "dateOfBirth": "1989-05-05",
         "address": {
             "address1": "chee",
             "address2": "cheeq",
             "city": "tn",
             "state": "tn",
             "country": "India",
             "zip": "600088"
         },
         "mobileNumber": "7777777347",
         "emailAddress": "msys3419@gmail.com"
  });
    const [formErrors, setFormErrors] = useState({"username":"","password":"", "mobileNumber":""});

    const handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setForm(values => ({...values, [name]: value}))
      console.log(form)

      validateField(name, value);
    }

  const validateField = (fieldName, value) => {
      let fieldValidationErrors = form.formErrors;
      let identificationTypeValid = form.identificationTypeValid;
      let identificationNumberValid = form.identificationNumberValid;
      let expiryDateValid = form.expiryDateValid;
  
      switch(fieldName) {
        case 'identificationNumber':
        identificationNumberValid = value.length >= 2;
        fieldValidationErrors.identificationNumber = identificationNumberValid ? '': 'identification number should have minimum 2 characters';
          break;
          case 'identificationType':
            identificationTypeValid = value.length >= 2;
            fieldValidationErrors.identificationType = identificationTypeValid ? '': 'identification number should have minimum 2 characters';
              break;
              case 'identificationNumber':
                expiryDateValid = value.length >= 2;
                fieldValidationErrors.expiryDate = expiryDateValid ? '': 'identification number should have minimum 2 characters';
                  break;
        default:
          break;
      }
      setForm(values => ({...values, formErrors: fieldValidationErrors,identificationNumberValid:identificationNumberValid,identificationTypeValid:identificationTypeValid,
    expiryDateValid:expiryDateValid}))
     
                     validateForm();
                    
                    
    }

 const validateForm = () => {
 // form.formValid= form.emailValid && form.passwordValid;
  setForm(values => ({...values, formValid: form.expiryDateValid && form.identificationNumberValid && form.identificationTypeValid}))
 // setForm(form);
      
    }

   const errorClass=(error)=> {
      return(error.length === 0 ? '' : 'has-error');
    }


    const onSignup = (signupjson) => {
      signupjson.username = form.username;
      signupjson.emailAddress = form.email;

      nextStep(form,'IdentificationDetails');
      

      // signup(signupjson).then((data)=>{
      //   console.log(data);
      //   navigate('/success');
      // })
    }

    const redirectTo = () =>{
        handleUpdate(2);
      }

    useEffect(()=>{
        if(identificationDetailsValue!=null){
            setForm(identificationDetailsValue);
          }
    },[]);
    return (
        <>

<form className="demoForm">
<div className="form-container">
        <div className="title"> Sign Up</div>
        <div className={`form-group form-elements ${errorClass(form.formErrors.identificationType )}`}>
          <label htmlFor="identificationType" className="form-label">IDentification Type</label>
          <input type="text" className={form.formErrors.identificationType.length > 0 ? "is-invalid form-control" : "form-control"} name="identificationType"
            placeholder="Please enter identification type"
            value={form.identificationType}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.identificationType}</div>
                    }
        </div>
        <div className={`form-group form-elements ${errorClass(form.formErrors.identificationNumber)}`}>
          <label htmlFor="identificationNumber" className="form-label">Identification Number</label>
          <input type="identificationNumber" required  
          className={form.formErrors.identificationNumber.length > 0 ? "is-invalid form-control" : "form-control"} name="identificationNumber"
            placeholder="Please enter identification number address"
            value={form.identificationNumber}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.identificationNumber}</div>
                    }
        </div>

        <div className={`form-group form-elements ${errorClass(form.formErrors.expiryDate)}`}>
          <label htmlFor="expiryDate" className="form-label">Identification Expiry Date</label>
          <input type="month" required  
          className={form.formErrors.expiryDate.length > 0 ? "is-invalid form-control" : "form-control"} name="expiryDate"
            placeholder="Please enter expiry date"
            value={form.expiryDate}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.expiryDate}</div>
                    }
        </div>

        
        
        <div className="button-container">
            <button type="button"  className="btn btn-light cancel" onClick={()=>redirectTo('userDetails')}>Back</button>
              <button type="button"  className="btn btn-primary action"  onClick={(e)=>onSignup(signupjson)}>Next</button>
            </div>
        {/* <button type="submit" className="btn btn-primary" disabled={!form.formValid}>Sign up</button> */}
        </div>
        
      </form>
       
        {/* <div className="form-container">
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
            </div> */}
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
      
            {/* </div>
            <div className="button-container">
            <button type="button"  className="btn btn-light cancel">Cancel</button>
              <button type="submit"  className="btn btn-primary action">Next</button>
            </div>
      
      </form> 
      </div>*/}
       </> 
    );
}

export default IdentificationDetails;


