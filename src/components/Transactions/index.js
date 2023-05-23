import React, {useEffect, useState} from 'react';
import './index.css';
import Header from '../Header';
import SideBar from '../SideBar';
function Transaction() {
  // eslint-disable-next-line no-unused-vars
  const [transactionList, setTransactionList] = useState([])

  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    const responseLinkAccount = await fetch('http://3.232.225.73/digital-wallet/wallet/transactions?userId=cbc29bee-3ff3-47d6-9314-d0423a7e93a8', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        
      },
    });

    const datalinkaccount = await responseLinkAccount.json();
    setTransactionList(datalinkaccount)
    console.log(datalinkaccount);
  }

  return(
    <>

      <Header page={'dashboard'}></Header>
      <div className="container-fluid content-area">
        <div className="row flex-nowrap">
          <SideBar />
          <div className="col py-3 px-5">
            <div className="wallet-title">Transaction List</div>
            <table className="table table-striped table-hover">
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
          </div>
                
                
        </div>
      </div>
    </>
  )
}

export default Transaction