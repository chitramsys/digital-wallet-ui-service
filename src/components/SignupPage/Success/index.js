import React from "react";
import { useNavigate} from "react-router-dom";
import "./index.css";
function UserDetails() {
    const navigate = useNavigate();

    const navigateTo =() =>{
        navigate('/');
      }
    return(
        <>
       <div  className="sign-up">
      <div className="signup-container" >

       <div className="success-msg" > User Successfully created </div>

       <div className="button-container">
            <button type="button"  className="btn btn-light cancel" onClick={()=>navigateTo()}>Cancel</button>
              </div> 
      </div>
      </div>
        </>
    )
}

export default UserDetails