/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import './index.css';
import Header from '../Header';
import SideBar from '../SideBar';
import Loader from '../Loader';
import UserService from '../../services/UserService';
function Transaction() {
  // eslint-disable-next-line no-unused-vars
  const [transactionList, setTransactionList] = useState([])
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [loading, setLoading] = useState(true);


  const getTransaction = async (userId) => {
    const responseLinkAccount = await fetch(`http://3.232.225.73/digital-wallet/wallet/transactions?userId=${userId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        
      },
    });

    const datalinkaccount = await responseLinkAccount.json();
    setTransactionList(datalinkaccount)
    setLoading(false);
  }

  const getCurrentUsers = async (username) => {
    setLoading(true);
    const responseProfileData = await fetch(
      `${process.env.REACT_APP_serverURL}/user/${username}`,
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
    setCurrentUserId(profileData?.userId);
  };

  useEffect(() => {
    if (currentUserId) {
      getTransaction(currentUserId)
    }
  }, [currentUserId])

  useEffect(() => {
    if (currentUsername) {
      getCurrentUsers(currentUsername);
    }
  }, [currentUsername]);

  useEffect(() => {
    const username = UserService.getUsername();
    if (username !== currentUsername) {
      setCurrentUsername(username);
    }
  }, []);

  return(
    <>

      <Header page={'dashboard'}></Header>
      <div className="container-fluid content-area">
        <div className="row flex-nowrap">
          <SideBar />
          <div className="col py-3 px-5">
            <div className="wallet-title">Transaction List</div>
            {
              loading ? <div className='transc-loader'><Loader /></div> : <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Amount</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionList && transactionList.length>0 && transactionList.map(trans=>{
                    console.log('ss')
                    return(
                    
                      <tr key={trans.transacDateTime}>
                        <td>{trans.amount}</td>
                        <td>{trans.accountIDFrom}</td>
                        <td>{trans.accountIDTo}</td>
                        <td>{trans.transacDateTime}</td>
                        <td>{trans.transactionStatus}</td>
                      </tr>
                    )}) }
              
    
                </tbody>
              </table>
            }
          </div>
                
                
        </div>
      </div>
    </>
  )
}

export default Transaction