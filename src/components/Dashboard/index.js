/* eslint-disable no-undef */
import React, { useState, useEffect, useCallback } from 'react';
import './index.css';
import { usePlaidLink } from 'react-plaid-link';
import { linkToken } from '../../services/ApiService';
import Header from '../Header';


import SideBar from '../SideBar';
import ProfileDetails from '../ProfileDetails';

function App() {
  const [token, setToken] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState({});
  const [currentUserWalletData, setCurrentUserWalletData] = useState({});

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
    console.log(data);
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
          userId: '6433a4233810353a290384c0',
          bankRoutingNumber: 'CITI2041',
          bankAccountId: '234354546445',
        }),
      }
    );

    // eslint-disable-next-line no-unused-vars
    const datalinkaccount = await responseLinkAccount.json();
    getUsers();
    setLoading(false);
  }, [setLoading]);

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
  const sideBarCollapse = async () => setSideBarCollapsed(!sideBarCollapsed);
  useEffect(() => {
    if (token == null) {
      createLinkToken();
    }
    if (isOauth && ready) {
      open();
    }

    getUsers();
  }, [token, isOauth, ready, open, createLinkToken]);

  const getCurrentUsers = async () => {
    const responseProfileData = await fetch(
      'http://3.232.225.73/digital-wallet/user/tests2',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    // eslint-disable-next-line no-unused-vars
    const profileData = await responseProfileData.json();
    console.log(profileData);
    setCurrentUserData(profileData);
    setLoading(false);
  };

  const getCurrentUsersWallet = async () => {
    const responseWalletData = await fetch(
      'http://3.232.225.73/digital-wallet/wallet/account',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'user-id': '43d1b2be-abff-4d11-b4fd-cf5463bd9f4c',
        },
      }
    );

    // eslint-disable-next-line no-unused-vars
    const walletData = await responseWalletData.json();
    console.log(walletData);
    setCurrentUserWalletData(walletData);
    setLoading(false);
  };

  useEffect(() => {
    getCurrentUsers();
    getCurrentUsersWallet();
  }, []);

  const getUsers = async () => {
    const responseLinkAccount = await fetch(
      `${process.env.REACT_APP_serverURL}/digital-wallet/userId/6433a4233810353a290384c0`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    // eslint-disable-next-line no-unused-vars
    const datalinkaccount1 = await responseLinkAccount.json();
    console.log(datalinkaccount1);
    setLoading(false);
    setData(datalinkaccount1);
  };
  return (
    <>
      <Header page={'dashboard'}></Header>
      <div className="container-fluid content-area">
        <div className="row flex-nowrap">
          <SideBar />
          <div className="col py-3 px-5">
            <ProfileDetails currentUserData={currentUserData} currentUserWalletData={currentUserWalletData} />
            <section>
              <div className='linked-account--header'>
                <div className="linked-bank-title">Linked Bank Accounts</div>
                
                <button
                  type="button"
                  onClick={() => open()}
                  disabled={!ready}
                  className="btn btn-secondary link-account--button"
                >
                    Link Account
                </button>
              </div>

              <div className="container">
                <div className="row">
                  {!loading &&
                      data != null &&
                      data.result.data.length > 0 &&
                      data.result.data.map((account, i) => (
                        <div
                          key={i}
                          className="col-3"
                          style={{ width: '18rem !important' }}
                        >
                          <div className="card border-info mb-3" key={i}>
                            <div className="card-header">
                              {account.bankName}
                              <span
                                style={{ float: 'right', cursor: 'pointer' }}
                              >
                                X
                              </span>
                            </div>
                            <div className="card-body">
                              <span> Available Balance</span>
                              <h5 className="card-title">
                                {account.accountBalance}
                              </h5>
                              <div style={{ display: 'flex' }}>
                                <span style={{ flex: 1 }}>
                                  Account No: ***
                                  {account.bankAccountId &&
                                    account.bankAccountId.slice(-4)}
                                </span>
                                <p className="card-text">
                                  <a
                                    style={{
                                      textDecoration: 'underline',
                                      cursor: 'pointer',
                                      alignContent: 'flex-end',
                                    }}
                                  >
                                    Transfer
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
