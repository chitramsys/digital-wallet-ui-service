import React, {useEffect, useState, useCallback} from "react";
import { usePlaidLink } from "react-plaid-link";
import { useNavigate} from "react-router-dom";
import './index.css';
import MSysLogo from '../../assets/images/msysLogo.png';
import {linkToken} from '../../services/ApiService'
function Dashboard (){


    const navigate = useNavigate();

      const navigateTo = (path) => {
        navigate('/'+path);
      };

      const [token, setToken] = useState(null);
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
    
      const onSuccess = useCallback(async (publicToken) => {
        setLoading(true);
        await fetch("/api/exchange_public_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ public_token: publicToken }),
        });
        await getBalance();
      }, []);
    
      // Creates a Link token
      const createLinkToken = React.useCallback(async () => {
        // For OAuth, use previously generated Link token
        if (window.location.href.includes("?oauth_state_id=")) {
          const linkToken = localStorage.getItem('link_token');
          setToken(linkToken);
        } else {
          linkToken()
          .then(response => {
            const data = response.json();
            setToken(data.link_token);
            localStorage.setItem("link_token", data.link_token);
          })
          .catch(err => {
              
          })
         // const response = await fetch("http://localhost:8090/plaid-service/link-token", {});
         
        }
      }, [setToken]);
    
      // Fetch balance data
      const getBalance = React.useCallback(async () => {
        setLoading(true);
        const response = await fetch("/api/balance", {});
        const data = await response.json();
        setData(data);
        setLoading(false);
      }, [setData, setLoading]);
    
      let isOauth = false;
    
      const config = {
        token,
        onSuccess,
      };
    
      // For OAuth, configure the received redirect URI
      if (window.location.href.includes("?oauth_state_id=")) {
        config.receivedRedirectUri = window.location.href;
        isOauth = true;
      }
      const { open, ready } = usePlaidLink(config);
    
      useEffect(() => {
        if (token == null) {
          createLinkToken();
        }
        if (isOauth && ready) {
          open();
        }
      }, [token, isOauth, ready, open]);

    return(
        <div className="outer-container">
            <div className="lable-align"><img  alt="" src={MSysLogo} style={{height: 100, width: 80+'%', margin: 20}}/></div>
                      <div  className="header">Hello user, you have wallet balance is 4000</div>
           
                <div className="content link-label">Link your bank account? <a className="clickme" onClick={() => open()
        } disabled={!ready} href=" " >Click here </a></div>
           
                <div className="content link-label">Transfer your money to wallet? <a href=" " className="clickme" onClick={()=>navigateTo('addMoney')}>Click here </a></div>
           
        

        </div>
    )

}

export default Dashboard