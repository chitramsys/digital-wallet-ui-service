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

/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function ResidanceDetails(props) {
  const {step, handleUpdate, nextStep, prevStep, errorMessage, residanceDetailsValue} = props;
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
      step: 1,
      address1: '',
      address2: '',
      city: '',
      state: '',
      formErrors: {address1: '', address2: '', city: '', state: ''},
      address1Valid: false,
      address2Valid: false,
      cityValid: false,
      stateValid:false,
      formValid: false
    });
    const [signupjson, setSignupjson] =useState({
      "username": "chitra11",
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
    const [formErrors, setFormErrors] = useState({"address1":"","address2":"", "city":"", "state": ""});
    const [errorMsg, setErrorMsg] = useState(errorMessage);
    const handleUserInput = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setForm(values => ({...values, [name]: value}))
      console.log(form)

      validateField(name, value);
    }

  const validateField = (fieldName, value) => {
      let fieldValidationErrors = form.formErrors;
      let address1Valid = form.address1Valid;
      let address2Valid = form.address2Valid;
      let cityValid = form.cityValid;
      let stateValid = form.stateValid;
  
      switch(fieldName) {
        case 'address1':
            address1Valid = value.length >= 2;
          fieldValidationErrors.address1 = address1Valid ? '': 'address1 should have minimum 2 characters';
          break;
          case 'address2':
            address2Valid = value.length >= 2;
            fieldValidationErrors.address2 = address2Valid ? '': 'address2 should have minimum 2 characters';
            break;
            case 'city':
                cityValid = value.length >= 2;
                fieldValidationErrors.city = cityValid ? '': 'city should have minimum 2 characters';
                break;
                case 'state':
                    stateValid = value.length >= 2;
                    fieldValidationErrors.state = stateValid ? '': 'state should have minimum 2 characters';
                    break;
        default:
          break;
      }
      setForm(values => ({...values, formErrors: fieldValidationErrors,address1Valid:address1Valid,address2Valid:address2Valid,cityValid:cityValid,stateValid:stateValid}))
     
                     validateForm();
                    
                    
    }

 const validateForm = () => {
 // form.formValid= form.emailValid && form.passwordValid;
  setForm(values => ({...values, formValid: form.address1Valid && form.address2Valid && form.cityValid && form.stateValid}))
 // setForm(form);
      
    }

   const errorClass=(error)=> {
      return(error.length === 0 ? '' : 'has-error');
    }

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
            //  signup(userDetails)
            //  .then(res => {
            //      console.log("user created")
            //  })
            //  .catch(err => {
            //      toast.error('Login Failed!!!')
            //  })
       // }
    };

    const onSignup = (signupjson) => {   
     nextStep(form, 'Residance');
      

      
    }

    const redirectTo = () =>{
        handleUpdate(3);
      }

    useEffect(()=>{
        if(residanceDetailsValue!=null){
            setForm(residanceDetailsValue);
          }
      setErrorMsg(errorMessage);
    },[errorMessage]);
    return (
        <>

<form className="demoForm">
<div className="form-container">
        <div className="title"> Sign Up</div>
        <div className="error-message">{errorMsg}</div>
        <div className={`form-group form-elements ${errorClass(form.formErrors.address1)}`}>
          <label htmlFor="address1" className="form-label">Address 1</label>
          <input type="text" className={form.formErrors.address1.length > 0 ? "is-invalid form-control" : "form-control"} name="address1"
            placeholder="Please enter address 1"
            value={form.address1}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.address1}</div>
                    }
        </div>
        <div className={`form-group form-elements ${errorClass(form.formErrors.address2)}`}>
          <label htmlFor="address2" className="form-label">Address 2</label>
          <input type="text" required  
          className={form.formErrors.address2.length > 0 ? "is-invalid form-control" : "form-control"} name="address2"
            placeholder="Please enter email address 2"
            value={form.address2}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.address2}</div>
                    }
        </div>

        <div className={`form-group form-elements ${errorClass(form.formErrors.city)}`}>
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" required  
          className={form.formErrors.city.length > 0 ? "is-invalid form-control" : "form-control"} name="city"
            placeholder="Please enter city"
            value={form.city}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.city}</div>
                    }
        </div>

        <div className={`form-group form-elements ${errorClass(form.formErrors.state)}`}>
          <label htmlFor="state" className="form-label">State</label>
          <input type="text" required  
          className={form.formErrors.state.length > 0 ? "is-invalid form-control" : "form-control"} name="state"
            placeholder="Please enter state"
            value={form.state}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.state}</div>
                    }
        </div>

        {/* <div className={`form-group form-elements ${errorClass(form.formErrors.mobileNumber)}`}>
          <label htmlFor="mobileNumber" className="form-label">Country</label>
          <input type="text" required  
          className={form.formErrors.mobileNumber.length > 0 ? "is-invalid form-control" : "form-control"} name="mobileNumber"
            placeholder="Please enter mobile number"
            value={form.mobileNumber}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.mobileNumber}</div>
                    }
        </div>

        <div className={`form-group form-elements ${errorClass(form.formErrors.mobileNumber)}`}>
          <label htmlFor="mobileNumber" className="form-label">ZIP code</label>
          <input type="text" required  
          className={form.formErrors.mobileNumber.length > 0 ? "is-invalid form-control" : "form-control"} name="mobileNumber"
            placeholder="Please enter mobile number"
            value={form.mobileNumber}
            onChange={(e)=>handleUserInput(e)}  />
             {
                        <div className="invalid-feedback">{form.formErrors.mobileNumber}</div>
                    }
        </div> */}
        
        <div className="button-container">
            <button type="button"  className="btn btn-light cancel" onClick={()=>redirectTo('identification')}>Back</button>
              <button type="button"  className="btn btn-primary action" disabled={!form.formValid} onClick={(e)=>onSignup(signupjson)}>Submit</button>
            </div>
      
        </div>
        
      </form>
       
       
       </> 
    );
}

export default ResidanceDetails;


