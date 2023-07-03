/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
import Loader from '../Loader';
import UserService from '../../services/UserService';

/**
 * Top Repos List
 *
 * @description: Shows the list of Top Repos for a Github User
 * @returns Bootstrap List Group of Top Repos
 */
function AddMoneyToWallet() {
  // eslint-disable-next-line no-unused-vars
  const [moneyTranserType, setMoneyTranserType] = useState(
    'Add Money from Bank to Wallet'
  );
  const [walletId, setWalletId] = useState();
  const [amount, setAmount] = useState(0);
  const [showToastMessage, setShowToastMessage] = useState(false);
  const [payWithRadioOption, setPayWithRadioOption] = useState('mobile');
  const [mobileEmailValue, setMobileEmailValue] = useState('');
  const [accountNumInput, setAccountNumInput] = useState('');
  const [remarkInput, setRemarkInput] = useState('');
  const [currentUserId, setCurrentUserId] = useState();
  const [currentWalletId, setCurrentWalletId] = useState();
  const [loader, setloader] = useState(true);
  const [currentUsername, setCurrentUsername] = useState('');

  const onOptionChange = (e) => {
    setPayWithRadioOption(e.target.value);
  };

  const handleChange = (event) => {
    setAmount(
      event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
    );
  };

  const handleMobileEmailValueChange = (e) => {
    if (payWithRadioOption === 'email') {
      setMobileEmailValue(e.target.value);
    } else {
      setMobileEmailValue(
        e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
      );
    }
  };

  useEffect(() => {
    if (currentUserId) {
      setloader(true);
      axios
        .get(`${process.env.REACT_APP_serverURL}/wallet/account`, {
          headers: {
            'user-id': currentUserId,
          },
        })
        .then((response) => {
          if (response?.data?.id) {
            setCurrentWalletId(response.data.id);
          } else {
            setCurrentWalletId();
          }
          setloader(false);
        })
        .catch((error) => {
          console.log(error);
          setCurrentWalletId();
          setloader(false);
        });
    }
  }, [currentUserId]);

  useEffect(() => {
    if (currentUsername) {
      setloader(true);
      axios
        .get(`${process.env.REACT_APP_serverURL}/user/${currentUsername}`)
        .then((response) => {
          if (response?.data?.userId) {
            console.log(response?.data);
            setCurrentUserId(response.data.userId);
          } else {
            setCurrentUserId();
          }
          setloader(false);
        })
        .catch((error) => {
          console.log(error);
          setCurrentUserId();
          setloader(false);
        });
    }
  }, [currentUsername]);

  useEffect(() => {
    const username = UserService.getUsername();
    setCurrentUsername(username);
  }, []);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowToastMessage(true);
    // setWalletId('')
    // setWalletAmount(0);
    // const responseLinkAccount = await fetch(`${process.env.REACT_APP_serverURL}/wallet/payment/wallet-to-wallet`, {
    //   method: 'POST',
    //   headers: {
    //     'accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'user-id': 'cbc29bee-3ff3-47d6-9314-d0423a7e93a8'
    //   },
    //   body: JSON.stringify({
    //     'toWalletAccountId': '23907d09-3d25-4499-96f1-03e02d12a074',
    //     'amount': walletAmount,
    //     'reason': 'testing',
    //     'currency': 'GBP'
    //   }),
    // });

    // const datalinkaccount = await responseLinkAccount.json();
    // console.log(datalinkaccount);
    if (moneyTranserType === 'Add Money from Wallet to Wallet') {
      const responseLinkAccount = await fetch(`${process.env.REACT_APP_serverURL}/wallet/payment/wallet-to-wallet`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'user-id': walletId
        },
        body: JSON.stringify({
          'toWalletAccountId': '23907d09-3d25-4499-96f1-03e02d12a074',
          'amount': walletAmount,
          'reason': 'testing',
          'currency': 'GBP'
        }),
      });

      const datalinkaccount = await responseLinkAccount.json();
      console.log(datalinkaccount);
    }
    if (moneyTranserType === 'Add Money from Wallet to Bank') {
      axios
        .post(
          `${process.env.REACT_APP_serverURL}/wallet/payment/Wallet-toBank`,
          {
            idempotencyKey: Math.floor(Math.random() * 1000000000) + Date.now(),
            walletId: currentWalletId,
            counterparty: {
              name: 'Test',
              numbers: {
                bacs: {
                  account: accountNumInput,
                  sortCode: '123456',
                },
                international: {
                  iban: '',
                },
              },
            },
            amount: {
              isoCurrencyCode: 'GBP',
              value: amount,
            },
            reference: remarkInput,
            accessToken: localStorage.getItem('accessToken'),
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (moneyTranserType === 'Add Money from Bank to Wallet') {
      axios
        .post(
          `${process.env.REACT_APP_serverURL}/wallet/payment/bank-to-wallet`,
          {
            idempotencyKey: Math.floor(Math.random() * 1000000000) + Date.now(),
            walletId: currentWalletId,
            counterparty: {
              name: 'Test',
              numbers: {
                bacs: {
                  account: accountNumInput,
                  sortCode: '123456',
                },
                international: {
                  iban: '',
                },
              },
            },
            amount: {
              isoCurrencyCode: 'GBP',
              value: amount,
            },
            reference: remarkInput,
            accessToken: localStorage.getItem('accessToken'),
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setShowToastMessage(false);
  };

  // const handleOnWalletToWalletClick = useCallback((e) => {
  //   if (e.target.value !== moneyTranserType) {
  //     setIsWalletToWalletSelected(e.target.value === 'Add Money from Wallet to Wallet')
  //     setMoneyTranserType(e.target.value)
  //     setWalletAmount(0)
  //   }
  // }, [moneyTranserType])

  const handleOnAddHundred = () => {
    setAmount(amount ? amount + 100 : 100);
  };

  const handleOnAddfiveHundred = () => {
    setAmount(amount ? amount + 500 : 500);
  };
  const handleOnAddThousand = () => {
    setAmount(amount ? amount + 1000 : 1000);
  };
  const handleWalletIdChange = (e) => {
    setWalletId(e.target.value);
  };
  const handleOnToastClose = () => {
    setShowToastMessage(false);
  };

  return (
    <>
      <div className="wallet-title"> Transer Money </div>
      {loader ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : currentWalletId ? (
        <>
          <select
            className="form-select header select-wrapper"
            aria-label="Default select example"
            onClick={(e) => setMoneyTranserType(e.target.value)}
          >
            {/* <option selected>Add Money to Wallet</option>  */}
            <option value="Add Money from Bank to Wallet">
              Add Money from Bank to Wallet
            </option>
            <option value="Add Money from Wallet to Bank">
              Add Money from Wallet to Bank
            </option>
            <option value="Add Money from Wallet to Wallet">
              Add Money from Wallet to Wallet
            </option>
          </select>
          <div className="outer-container">
            {showToastMessage && (
              <div
                className="alert alert-success alert-dismissible fade show toast-wrapper"
                role="alert"
              >
                <strong>Success!</strong> Money Added Successfully.
                <button
                  type="button"
                  className="close close-btn"
                  onClick={handleOnToastClose}
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="content">
                {moneyTranserType === 'Add Money from Wallet to Wallet' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label lable-align">Pay with</label>
                      <div className="radio-option--container">
                        <input
                          type="radio"
                          name="payWith"
                          value="mobile"
                          id="mobile"
                          checked={payWithRadioOption === 'mobile'}
                          onChange={onOptionChange}
                        />
                        <label
                          className="form-label lable-align email-mobile--label"
                          htmlFor="mobile"
                        >
                          Mobile
                        </label>

                        <input
                          type="radio"
                          name="payWith"
                          value="email"
                          id="email"
                          className="email-radio--input"
                          checked={payWithRadioOption === 'email'}
                          onChange={onOptionChange}
                        />
                        <label
                          className="form-label lable-align email-mobile--label"
                          htmlFor="email"
                        >
                          Email
                        </label>
                      </div>
                      <input
                        type={payWithRadioOption === 'email' ? 'email' : 'text'}
                        minLength={payWithRadioOption === 'email' ? '2' : '10'}
                        name="mobileEmail"
                        value={mobileEmailValue || ''}
                        onChange={handleMobileEmailValueChange}
                        maxLength={payWithRadioOption === 'email' ? '64' : '10'}
                        placeholder={
                          payWithRadioOption === 'email'
                            ? 'Please enter email address'
                            : 'Please enter mobile number'
                        }
                        className="form-control"
                        id="mobileEmail"
                        required
                      />
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label lable-align">
                    Enter amount
                  </label>
                  <input
                    type="text"
                    minLength="2"
                    name="amount"
                    value={amount || ''}
                    onChange={handleChange}
                    maxLength="64"
                    placeholder="Enter amount"
                    className="form-control"
                    id="amount"
                    required
                  />
                </div>
                {moneyTranserType === 'Add Money from Bank to Wallet' &&
                <div className="mb-3">
                  <label
                    htmlFor="accountNo"
                    className="form-label lable-align"
                  >
                        Enter Bank Account Number
                  </label>
                  <input
                    type="text"
                    minLength="2"
                    name="amount"
                    value={accountNumInput || ''}
                    onChange={(e) =>
                      setAccountNumInput(
                        e.target.value
                          .replace(/[^0-9.]/g, '')
                          .replace(/(\..*?)\..*/g, '$1')
                      )
                    }
                    placeholder="Enter Account Number"
                    className="form-control"
                    id="accountNo"
                    required
                  />
                </div>
                }
                {moneyTranserType === 'Add Money from Wallet to Bank' && (
                  <>
                    <div className="mb-3">
                      <label
                        htmlFor="accountNo"
                        className="form-label lable-align"
                      >
                        Enter Bank Account Number
                      </label>
                      <input
                        type="text"
                        minLength="2"
                        name="amount"
                        value={accountNumInput || ''}
                        onChange={(e) =>
                          setAccountNumInput(
                            e.target.value
                              .replace(/[^0-9.]/g, '')
                              .replace(/(\..*?)\..*/g, '$1')
                          )
                        }
                        placeholder="Enter Account Number"
                        className="form-control"
                        id="accountNo"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="remark"
                        className="form-label lable-align"
                      >
                        Enter Remark
                      </label>
                      <input
                        type="text"
                        minLength="2"
                        name="remark"
                        value={remarkInput || ''}
                        onChange={(e) => setRemarkInput(e.target.value)}
                        placeholder="Enter Remark"
                        className="form-control"
                        id="remark"
                      />
                    </div>
                  </>
                )}
                {moneyTranserType === 'Add Money from Wallet to Wallet' && (
                  <div className="mb-3">
                    <label htmlFor="amount" className="form-label lable-align">
                      Enter Wallet Id
                    </label>
                    <input
                      type="text"
                      minLength="5"
                      name="amount"
                      value={walletId || ''}
                      onChange={handleWalletIdChange}
                      maxLength="64"
                      placeholder="Enter Wallet Id"
                      className="form-control"
                      id="amount"
                      required
                    />
                  </div>
                )}
                <div className="button-container">
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-left"
                    onClick={handleOnAddHundred}
                  >
                    &#x20b9; +100
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-center button-align"
                    onClick={handleOnAddfiveHundred}
                  >
                    &#x20b9; +500
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary text-right button-align"
                    onClick={handleOnAddThousand}
                  >
                    &#x20b9; +1000
                  </button>
                </div>
                <div className="row submit">
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: '#0047AB' }}
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="no-wallet-found">
          <span className="no-wallet-found--text">
            No Wallet Details Found!
          </span>
        </div>
      )}
    </>
  );
}

export default AddMoneyToWallet;
