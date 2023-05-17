/* eslint-disable no-undef */
import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import { usePlaidLink } from 'react-plaid-link';
import { linkToken } from '../../services/ApiService';
import Header from '../Header';

import SideBar from '../SideBar';

function App() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  //const [displayResponse, setDisplayResponse] = useState('');
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true);

  // const createWalletUser = () => {
  //   const response = fetch(
  //     `${process.env.REACT_APP_serverURL}/wallet/account`,
  //     {
  //       headers: {
  //         accept: 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         'user-id': uuid(), //'987b17f3-bc1c-4223-8075-dd3f8e8fba2a'
  //       },
  //       method: 'POST',
  //     }
  //   );

  //   response
  //     .then((res) => res.json())
  //     .then((data) => setDisplayResponse(JSON.stringify(data)));
  // };

  const onSuccess = useCallback(async (publicToken) => {
    setLoading(true);
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_serverURL}/plaid-service/access-token`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ publicToken: publicToken }),
      }
    );
    var data = await response.json();
    localStorage.setItem('accessToken', data.result.data.accessToken);
    await getBalance();
  }, []);

  // Creates a Link token
  const createLinkToken = React.useCallback(async () => {
    // For OAuth, use previously generated Link token
    if (window.location.href.includes('?oauth_state_id=')) {
      const linkToken = localStorage.getItem('link_token');
      setToken(linkToken);
    } else {
      linkToken()
        .then((response) => {
          localStorage.setItem('link_token', response.result.data.linkToken);
          setToken(response.result.data.linkToken);
        })
        // eslint-disable-next-line no-unused-vars
        .catch((err) => {});
    }
  }, [setToken]);

  // Fetch balance data
  const getBalance = React.useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      // eslint-disable-next-line no-undef
      `${process.env.REACT_APP_serverURL}/plaid-service/account-details`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          accessToken: localStorage.getItem('accessToken'),
        }),
      }
    );
    const data = await response.json();

    setData(data);
    const responseLinkAccount = await fetch(
      `${process.env.REACT_APP_serverURL}/plaid-service/link-bank-account`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          bankName: 'Bank of America',
          userId: '642eca73e504cb20a953eba6',
          bankRoutingNumber: 'CITI2041',
          bankAccountId: '234354546445',
        }),
      }
    );

    // eslint-disable-next-line no-unused-vars
    const datalinkaccount = await responseLinkAccount.json();
    setLoading(false);
  }, [setData, setLoading]);

  let isOauth = false;

  const config = {
    token,
    onSuccess,
  };

  // For OAuth, configure the received redirect URI
  if (window.location.href.includes('?oauth_state_id=')) {
    config.receivedRedirectUri = window.location.href;
    isOauth = true;
  }
  const { open, ready } = usePlaidLink(config);
  // eslint-disable-next-line no-unused-vars
  const sideBarCollapse = async() => setSideBarCollapsed(!sideBarCollapsed);
  useEffect(() => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }

    
    

    const getUsers = async () => {
      const responseLinkAccount = await fetch(
        `${process.env.REACT_APP_serverURL}/digital-wallet/userId`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            userId: '642eca73e504cb20a953eba6',
          }),
        }
      );

      // eslint-disable-next-line no-unused-vars
      const datalinkaccount1 = await responseLinkAccount.json();
    };

    getUsers();
  }, [token, isOauth, ready, open, createLinkToken]);

  return (
    <>
      <Header page={'dashboard'}></Header>
      <div className="container-fluid content-area">
        <div className="row flex-nowrap">
          <SideBar />
          <div className="col py-3 px-5">
            <div className="heading-container">
              <div className="linked-bank-title" >
              Linked Bank Accounts
              </div>
              <div className="link-account-button">
                <button
                  type="button"
                  onClick={() => open()}
                  disabled={!ready}
                  className="btn btn-secondary">
                Link Account
                </button>
            
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-3">
                    <div className="card border-info mb-3" style={{maxWidth: '18rem'}}>
                      <div className="card-header">City Bank <span style={{float:'right', cursor:'pointer'}}>X</span></div>
                      <div className="card-body">
                        <span> Available Balance</span><h5 className="card-title">20000</h5>
                        <div style={{display:'flex'}}><span style={{flex:1}}>Account No: ****4567</span><p className="card-text"><a style={{textDecoration: 'underline', cursor:'pointer', alignContent:'flex-end'}}>Transfer</a></p>
                        </div> </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card border-info mb-3" style={{maxWidth: '18rem'}}>
                      <div className="card-header">City Union <span style={{float:'right', cursor:'pointer'}}>X</span></div>
                      <div className="card-body">
                        <span> Available Balance</span><h5 className="card-title">20000</h5>
                        <div style={{display:'flex'}}><span style={{flex:1}}>Account No: ****4567</span><p className="card-text"><a style={{textDecoration: 'underline', cursor:'pointer', alignContent:'flex-end'}}>Transfer</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card border-info mb-3" style={{maxWidth: '18rem'}}>
                      <div className="card-header">Punjab Union<span style={{float:'right', cursor:'pointer'}}>X</span></div>
                      <div className="card-body">
                        <span> Available Balance</span><h5 className="card-title">20000</h5>
                        <div style={{display:'flex'}}><span style={{flex:1}}>Account No: ****2345</span><p className="card-text"><a style={{textDecoration: 'underline', cursor:'pointer', alignContent:'flex-end'}}>Transfer</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card border-info mb-3" style={{maxWidth: '18rem'}}>
                      <div className="card-header">HDFC Bank <span style={{float:'right', cursor:'pointer'}}>X</span></div>
                      <div className="card-body">
                        <span> Available Balance</span><h5 className="card-title">20000</h5>
                        <div style={{display:'flex'}}><span style={{flex:1}}>Account No: ****6767</span><p className="card-text"><a style={{textDecoration: 'underline', cursor:'pointer', alignContent:'flex-end'}}>Transfer</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="card border-info mb-3" style={{maxWidth: '18rem'}}>
                      <div className="card-header">Bank of America <span style={{float:'right', cursor:'pointer'}}>X</span></div>
                      <div className="card-body">
                        <span> Available Balance</span><h5 className="card-title">20000</h5>
                        <div style={{display:'flex'}}><span style={{flex:1}}>Account No: ****6567</span><p className="card-text"><a style={{textDecoration: 'underline', cursor:'pointer', alignContent:'flex-end'}}>Transfer</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-3">
                    {!loading &&
            data != null &&
            data.result.data.accounts.map((account, i) => (
              <div className="card border-info mb-3" key= {i} style={{maxWidth: '18rem'}}>
                <div className="card-header">Axis Bank<span style={{float:'right', cursor:'pointer'}}>X</span></div>
                <div className="card-body">
                  <span> Available Balance</span><h5 className="card-title">20000</h5>
                  <div style={{display:'flex'}}><span style={{flex:1}}>Account No: ****4567</span><p className="card-text"><a style={{textDecoration: 'underline', cursor:'pointer', alignContent:'flex-end'}}>Transfer</a></p>
                  </div>
                </div>
              </div>
            ))}
                  </div>
                </div>
              </div>
          

         


          
            </div>
        
          </div>
        </div>
      </div>
     
    </>
  );
}

export default App;
