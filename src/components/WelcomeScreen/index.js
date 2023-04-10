import './index.css';
import React , {useEffect } from 'react';
import UserService from '../../services/UserService';
import { useNavigate } from "react-router-dom";
import MSysLogo from '../../assets/images/msysLogo.png';

function WelcomeScreen ({onScreen}) {
    const navigate = useNavigate();
    const navigateTo = (path) => {
        navigate('/'+path);
      };

      useEffect(()=>{
console.log(typeof(process.env.REACT_APP_isKeycloak));
      },[])
    return (
      
        <div className='center'>
            <div>
                <img alt='logo' className='img-logo' src={MSysLogo} style={{ margin: 20}}/>
            </div>
            <div className='e-wallet-txt'>
                e-wallet
            </div>
            
         
      {process.env.REACT_APP_isKeycloak === 'true' &&       <div className="button-container">
              <button type="submit"  className="btn btn-primary"  onClick={() => UserService.doLogin()}> LOGIN</button>
            </div>
}

{process.env.REACT_APP_isKeycloak === 'false' &&       <div className="button-container">
              <button type="submit"  className="btn btn-primary"  onClick={() => navigateTo('dashboard')}> Go To Dashboard</button>
            </div>
}
            <br></br>
          

            <div className="button-container">
              <button type="submit"  className="btn btn-primary" onClick={() => navigateTo('signup')}>SIGNUP</button>
            </div>
            

        </div>
    )
}
export default WelcomeScreen;