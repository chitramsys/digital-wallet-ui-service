import React, { useState, useEffect, useCallback } from "react";
import "./index.css"
import { usePlaidLink } from "react-plaid-link";
//import "./App.scss";
import {linkToken} from '../../services/ApiService';
import uuid from 'react-uuid';
import Header from "../Header";
import linkAccount from '../../assets/images/wallet5.png';



function App(props) {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [displayResponse, setDisplayResponse] = useState("");

  const createWalletUser = () => {
    const response = fetch(`${process.env.REACT_APP_serverURL}/wallet/account`, {
      headers: {
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'user-id': uuid() //'987b17f3-bc1c-4223-8075-dd3f8e8fba2a'
      },
      method: "POST",
    })

    response.then(res => res.json()).then(data => setDisplayResponse(JSON.stringify(data)))
  }

  const onSuccess = useCallback(async (publicToken) => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_serverURL}/plaid-service/access-token`, {
      method: "POST",
      headers: {
        'accept': 'application/json',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ publicToken: publicToken }),
    });
    var data = await response.json();
    localStorage.setItem("accessToken", data.result.data.accessToken);
    await getBalance();
  }, []);

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes("?oauth_state_id=")) {
      const linkToken = localStorage.getItem('link_token');
      setToken(linkToken);
    } else {
          linkToken().then(response => {
            console.log(response)
            localStorage.setItem("link_token", response.result.data.linkToken);
            setToken(response.result.data.linkToken);

          })
          .catch(err => {})
    }
  }, [setToken]);

  // Fetch balance data
  const getBalance = React.useCallback(async () => {
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_serverURL}/plaid-service/account-details`, {
      method: "POST",
      headers: {
        'accept': 'application/json',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({ accessToken: localStorage.getItem('accessToken') }),
    });
    const data = await response.json();

    setData(data);
    const responseLinkAccount = await fetch(`${process.env.REACT_APP_serverURL}/plaid-service/link-bank-account`, {
      method: "POST",
      headers: {
        'accept': 'application/json',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({
        "bankName": "Bank of America",
        "userId": "642eca73e504cb20a953eba6",
        "bankRoutingNumber" : "CITI2041",
        "bankAccountId" : "234354546445"
      
      }),
    });
    
   const datalinkaccount = await responseLinkAccount.json();
console.log(data)
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

useEffect(  () => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }

    const getUsers = async () => {
    const responseLinkAccount = await fetch(`${process.env.REACT_APP_serverURL}/plaid-service/userId`, {
      method: "POST",
      headers: {
        'accept': 'application/json',
         'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*' 
      },
      body: JSON.stringify({
        "userId": "642eca73e504cb20a953eba6"
      }),
    })

    const datalinkaccount1 = await responseLinkAccount.json();
    console.log(datalinkaccount1);
  }

    getUsers();

    
 

  
  }, [token, isOauth, ready, open]);
  
  return (
    <>
    <Header page={'dashboard'}></Header>
    <div className="welcome-container">
      <div className="left-container" style={{padding:'30px'}}>
      <img alt="logo" className="img-logo" style={{width:'80%'}} src={linkAccount} />
</div>
      
      <div className="right-container" style={{padding:'30px'}}>
      
 <div style={{display: 'flex'}}> 
 <div style={{color: 'white',width: '100%', display:'flex',alignItems:'center', fontSize:'20px'}}>Linked Bank Accounts</div>
  <div style={{display: 'flex',float: 'right',flexDirection: 'row-reverse',/* align-items: flex-end; */width: '80%'}}>
  
       <button type="button"  onClick={() => open()
        } disabled={!ready} className="btn btn-link" style={{color: 'white'}}>Link Account</button></div> </div>  
         <div className="card text-white bg-primary mb-3" >
 <div className="card-body">
    <h5 className="card-title custom-title">City Bank Chennai Branch</h5>
    <div style={{display:'flex'}}>
    <div><span style={{fontSize:'14px'}}>Account NO:  </span><span style={{ fontSize:'12px'}}>2324353 45454</span></div>
    <div style={{marginLeft:'10px'}}><span style={{fontSize:'14px'}}>Account Balance:  </span><span style={{ fontSize:'12px'}}>10000.00</span></div>
    <div style={{marginLeft:'10px'}}><span style={{fontSize:'14px'}}>Account Status:  </span><span style={{ fontSize:'12px'}}>Active</span></div>
    </div>
    </div>
   </div>
   <div className="card text-white bg-primary mb-3" >
 <div className="card-body">
    <h5 className="card-title custom-title">City Bank Pune Branch</h5>
    <div style={{display:'flex'}}>
    <div><span style={{fontSize:'14px'}}>Account NO:  </span><span style={{ fontSize:'12px'}}>2324353 45454</span></div>
    <div style={{marginLeft:'10px'}}><span style={{fontSize:'14px'}}>Account Balance:  </span><span style={{ fontSize:'12px'}}>10000.00</span></div>
    <div style={{marginLeft:'10px'}}><span style={{fontSize:'14px'}}>Account Status:  </span><span style={{fontSize:'12px'}}>Active</span></div>
    </div>
    </div>
   </div>


          {!loading &&
        data != null &&
        data.result.data.accounts.map((account, i) => (
            <div className="card text-white bg-primary mb-3" >
        <div className="card-body">
           <h5 className="card-title custom-title">City Bank</h5>
           <div style={{display:'flex'}}>
           <div><span style={{fontSize:'14px'}}>Account NO:  </span><span style={{ fontSize:'12px'}}>{account.accountId}</span></div>
           <div style={{marginLeft:'10px'}}><span style={{fontSize:'14px'}}>Account Balance:  </span><span style={{ fontSize:'12px'}}>{account.balances?.available}</span></div>
           <div style={{marginLeft:'10px'}}><span style={{fontSize:'14px'}}>Account Status:  </span><span style={{fontSize:'12px'}}>Active</span></div>
           </div>
           </div>
          </div>
          
      
          ) 
      )}
   
        

  
      </div>
    </div>

    </>
//     <div className="">
//       <Header page={'dashboard'}></Header>
//       <button onClick={() => open()
//         } disabled={!ready}>
//         <strong>Link account</strong>
//       </button>
// <br/>
// <br/>
//       <button  onClick={() => createWalletUser()
//         } >
//         <strong>Create Wallet</strong>
//       </button>

//       <div>{displayResponse}</div>
//       {!loading &&
//         data != null &&
//         Object.entries(data).map((entry, i) => (
//           <pre key={i}>
//             <code>{JSON.stringify(entry[1], null, 2)}</code>
//           </pre>
//         )
//       )}
//     </div>
  );
}

export default App;