import React, { useState, useEffect } from "react";
import Header from "../Header";
import IdentificationDetails from "./IdentificationDetails";
import "./index.css";
import { useNavigate} from "react-router-dom";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import ResidanceDetails from "./ResidanceDetails";
import signupJSON  from "../../services/signup.json";
import {signup} from "../../services/ApiService";


/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function Signup() {

  const [step, setStep] = useState(1);
  const [userDetailsValue, setUserDetailsValue] = useState(null);
  const [personnalDetailsValue, setPersonnalDetailsValue] = useState(null);
  const [identificationDetailsValue, setIdentificationDetailsValue] = useState(null);
  const [residanceDetailsValue, setResidanceDetailsValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Proceed to next step
  const nextStep = (form, position) => {
    console.log(JSON.stringify(form));
    if(position==='UserDetails'){
      signupJSON.username = form.username;
      signupJSON.password = form.password;
      signupJSON.emailAddress = form.email;
      signupJSON.mobileNumber = form.mobileNumber;
    setUserDetailsValue(form);
    }
    else if(position==='personalDetails'){
      signupJSON.name.firstName = form.firstName;
      signupJSON.name.lastName = form.lastName;
      signupJSON.name.middleName = form.middleName;
      setPersonnalDetailsValue(form);
    }
    else if( position==='Residance'){
      setResidanceDetailsValue(form);
      signupJSON.address.address1 = form.address1;
      signupJSON.address.address2 =form.address2;
      signupJSON.address.city = form.city;
      signupJSON.address.state = form.state;
      signup(signupJSON).then((data)=>{
        console.log(data);
        if(data.status === 200){
        navigate('/success');
        }
        else{
          setErrorMessage(data.message)
        }
     })
    }
    else if(position==='IdentificationDetails'){
      signupJSON.kycIdentityType = form.identificationType;
      signupJSON.kycIdentiyNumber = form.identificationNumber;
      signupJSON.kycIdentityExpiration = form.expiryDate
      setIdentificationDetailsValue(form);
      setStep(4);
    }
    if(position !='Residance'){
    setStep(step+1);
    }
    
  };

  // go to prev step
  const handleUpdate = (step) => {
    setErrorMessage(null);
    setStep(step);
  };
  
    useEffect(()=>{
    },[]);

    return (
      <>
      <Header page={'signup'}></Header>

      <div className="welcome-container">
      <div className="left-container">
       {/* <img alt="logo" className="img-logo" src={MSysLogo} /> */}
      </div>
      <div className="right-container">
      <div  className="sign-up-content">
      <div className="sign-up-container" >
        
      {(() => {
        switch (step) {
          case 1:
            return <UserDetails  userDetailsValue = {userDetailsValue}  step={step} handleUpdate={handleUpdate}
            nextStep={nextStep} />
           
             case 2:
               return <PersonalDetails personnalDetailsValue={personnalDetailsValue}  step={step} handleUpdate={handleUpdate}
               nextStep={nextStep} />

               case 3:
                  return <IdentificationDetails  identificationDetailsValue = {identificationDetailsValue}  step={step} handleUpdate={handleUpdate}
                  nextStep={nextStep} />

                case 4:
                    return <ResidanceDetails residanceDetailsValue= {residanceDetailsValue} errorMessage = {errorMessage} step={step} handleUpdate={handleUpdate}
                    nextStep={nextStep} />
         
          default:
            return null
        }
      })()}
      </div>
      </div>
      </div>
    </div>
      {/* <div  className="sign-up-content">
      <div className="sign-up-container" >
      {(() => {
        switch (step) {
          case 1:
            return <UserDetails signUpJson={signUpJson}  step={step} handleUpdate={handleUpdate}
            nextStep={nextStep} prevStep={prevStep} />
           
             case 2:
               return <PersonalDetails signUpJson={signUpJson}  step={step} handleUpdate={handleUpdate}
               nextStep={nextStep} prevStep={prevStep} />

               case 3:
                  return <IdentificationDetails signUpJson={signUpJson}  step={step} handleUpdate={handleUpdate}
                  nextStep={nextStep} prevStep={prevStep} />

                case 4:
                    return <ResidanceDetails signUpJson={signUpJson}  step={step} handleUpdate={handleUpdate}
                    nextStep={nextStep} prevStep={prevStep} />
         
          default:
            return null
        }
      })()}
     

      
      </div>
      </div> */}
      </>
        
    );
}

export default Signup;
