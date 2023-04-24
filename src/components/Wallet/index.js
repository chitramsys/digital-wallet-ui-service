import React, { useState, useEffect, useCallback } from "react";
import "./index.css"
import { usePlaidLink } from "react-plaid-link";
//import "./App.scss";
import { linkToken } from '../../services/ApiService';
import uuid from 'react-uuid';
import Header from "../Header";



function App(props) {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [displayResponse, setDisplayResponse] = useState({});

  const createWalletUser = () => {
    const response = fetch(`${process.env.REACT_APP_serverURL}/wallet/account`, {
      headers: {
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'user-id': uuid() //'987b17f3-bc1c-4223-8075-dd3f8e8fba2a'
      },
      method: "POST",
    })
    setDisplayResponse({})
    response.then(res => res.json()).then(data => {
      console.log(data.length)
      setDisplayResponse(data)
    })
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
        .catch(err => { })
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
    const responseLinkAccount = await fetch(`${process.env.REACT_APP_serverURL}/link-bank-account`, {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        "bankName": "SampleBankName",
        "userId": "642eca73e504cb20a953eba6",
        "bankRoutingNumber": "CITI2041",
        "bankAccountId": "accountID"

      }),
    });

    const datalinkaccount = await responseLinkAccount.json();

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

  return (
    <>
      <Header page={'dashboard'}></Header>
      <button className="create-wallet-btn" onClick={() => createWalletUser()
      } >
        <strong>Create Wallet</strong>
      </button>

      {/* <div>{JSON.stringify(displayResponse)}</div> */}
      {Object.keys(displayResponse).length > 0 && (
        <div className="card text-white bg-primary mb-3 wallet-details-card" >
          <div className="card-body">
            <h5 class="card-title custom-title">Created Wallet Details</h5>
            <div className="details-wrapper">
              <div><span>User Id:  </span><span style={{ fontSize: '12px' }}>{displayResponse.userId}</span></div>
              <div><span>Plaid User Id:  </span><span style={{ fontSize: '12px' }}>{displayResponse.plaidWalletId}</span></div>
              <div><span>Account Balance:  </span><span style={{ fontSize: '12px' }}>{displayResponse.accountBalance}</span></div>
            </div>
          </div>
        </div>
      )
      }
      {!loading &&
        data != null &&
        Object.entries(data).map((entry, i) => (
          <pre key={i}>
            <code>{JSON.stringify(entry[1], null, 2)}</code>
          </pre>
        )
        )}
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