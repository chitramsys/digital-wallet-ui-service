import React, { useState, useCallback } from 'react';
import './index.css';

/**
 * Top Repos List
 *
 * @description: Shows the list of Top Repos for a Github User
 * @returns Bootstrap List Group of Top Repos
 */
function AddMoneyToWallet() {
  // eslint-disable-next-line no-unused-vars
  const [inputs, setInputs] = useState({});
  const [moneyTranserType, setMoneyTranserType] = useState('Add Money from Bank to Wallet')
  const [isWalletToWalletSelected, setIsWalletToWalletSelected] = useState(false);
  const [walletId, setWalletId] = useState('23907d09-3d25-4499-96f1-03e02d12a074')
  const [walletAmount, setWalletAmount] = useState(0)
  const [showToastMessage, setShowToastMessage] = useState(false)

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    setWalletAmount(event.target.value)
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    setShowToastMessage(true)
    setWalletId('')
    setWalletAmount(0);
    const responseLinkAccount = await fetch('http://3.232.225.73/digital-wallet/wallet/payment/wallet-to-wallet', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'user-id': 'cbc29bee-3ff3-47d6-9314-d0423a7e93a8'
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
    
    setShowToastMessage(false)
    
  }

  const handleOnWalletToWalletClick = useCallback((e) => {
    if (e.target.value !== moneyTranserType) {
      setIsWalletToWalletSelected(e.target.value === 'Add Money from Wallet to Wallet')
      setMoneyTranserType(e.target.value)
      setWalletAmount(0)
    }
  }, [moneyTranserType])

  const handleOnAddHundred = () => {
    setWalletAmount(walletAmount ? (walletAmount + 100) : 100)
  }

  const handleOnAddfiveHundred = () => {
    setWalletAmount(walletAmount ? (walletAmount + 500) : 500)
  }
  const handleOnAddThousand = () => {
    setWalletAmount(walletAmount ? (walletAmount + 1000) : 1000)
  }
  const handleWalletIdChange = (e) => {
    setWalletId(e.target.value);
    

  }
  const handleOnToastClose = () => {
    setShowToastMessage(false)
  }

  return (
    <>
      <div className="wallet-title"> Transer Money </div>
     
      <select className="form-select header select-wrapper" aria-label="Default select example" onClick={handleOnWalletToWalletClick}>
        {/* <option selected>Add Money to Wallet</option>  */}
        <option value="Add Money from Bank to Wallet">Add Money from Bank to Wallet</option>
        <option value="Add Money from Wallet to Bank">Add Money from Wallet to Bank</option>
        <option value="Add Money from Wallet to Wallet" >Add Money from Wallet to Wallet</option>
      </select> 
      <div className="outer-container">
        {showToastMessage && (
          <div className="alert alert-success alert-dismissible fade show toast-wrapper" role="alert">
            <strong>Success!</strong> Money Added Successfully.
            <button type="button" className="close close-btn" onClick={handleOnToastClose} data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
        }
        <form onSubmit={handleSubmit}>
          <div className="content">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label lable-align">Enter amount</label>
              <input type="text" minLength="2" name="amount" value={walletAmount || ''}
                onChange={handleChange} maxLength="64" placeholder="Enter amount" className="form-control" id="amount" required />
            </div>{isWalletToWalletSelected && (
              <div className="mb-3">
                <label htmlFor="amount" className="form-label lable-align">Enter Wallet Id</label>
                <input type="text" minLength="5" name="amount" value={walletId || ''}
                  onChange={handleWalletIdChange} maxLength="64" placeholder="Enter Wallet Id" className="form-control" id="amount" required />
              </div>
            )}
            <div className="button-container">
              <button type="button" className="btn btn-outline-secondary text-left" onClick={handleOnAddHundred}>&#x20b9; +100</button>
              <button type="button" className="btn btn-outline-secondary text-center button-align" onClick={handleOnAddfiveHundred}>&#x20b9; +500</button>
              <button type="button" className="btn btn-outline-secondary text-right button-align" onClick={handleOnAddThousand}>&#x20b9; +1000</button>
            </div>
            <div className="row submit">
              <button className="btn btn-primary" style={{ backgroundColor: '#0047AB' }} type="submit">Add</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddMoneyToWallet;
