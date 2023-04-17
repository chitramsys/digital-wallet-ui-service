import React, { useState, useEffect } from "react";
import Header from "../Header";
import IdentificationDetails from "./IdentificationDetails";
import "./index.css";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import ResidanceDetails from "./ResidanceDetails";


/**
 * Signup Display Page
 *
 * @description: Shows a Signup component with a form to enter username & password
 * @returns Signup Component
 */
function Signup() {

  const [form, setForm] = useState({
    email: '',
    username: '',
    mobileNumber: '',
    password: '',
  });
  const [step, setStep] = useState(1)

  // Proceed to next step
  const nextStep = () => {
    console.log("next")
    setStep(step+1);
    
  };

   // Go back to prev step
   const prevStep = () => {
    const { step } = form;
    setForm(values => ({...values, step: step-1}))
  };

  const handleUpdate = (form) => {
    console.log(form);
  };
  
    useEffect(()=>{
      
    },[]);
    return (
      <>
      <Header page={'signup'}></Header>
      <div  className="sign-up-content">
      <div className="signup-container" >
      {(() => {
        switch (step) {
          case 1:
            return <UserDetails  step={step} handleUpdate={handleUpdate}
            nextStep={nextStep} prevStep={prevStep} />
           
             case 2:
               return <PersonalDetails  step={step} handleUpdate={handleUpdate}
               nextStep={nextStep} prevStep={prevStep} />

               case 3:
                  return <IdentificationDetails  step={step} handleUpdate={handleUpdate}
                  nextStep={nextStep} prevStep={prevStep} />

                case 4:
                    return <ResidanceDetails  step={step} handleUpdate={handleUpdate}
                    nextStep={nextStep} prevStep={prevStep} />
         
          default:
            return null
        }
      })()}
     

      
      </div>
      </div>
      </>
        
    );
}

export default Signup;
