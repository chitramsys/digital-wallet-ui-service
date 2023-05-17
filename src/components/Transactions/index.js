import React from 'react';
import './index.css';
import Header from '../Header';
import SideBar from '../SideBar';
function Transaction() {

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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2000</td>
                  <td>city bank</td>
                  <td>Wallet</td>
                  <td>Tue May 09 2023 10:26:02</td>
                </tr>
                <tr>
    
                  <td>300</td>
                  <td>city bank</td>
                  <td>Wallet</td>
                  <td>Tue May 09 2023 10:26:02</td>
                </tr>
                <tr>
     
                  <td>750</td>
                  <td>city bank</td>
                  <td>Wallet</td>
                  <td>Tue May 09 2023 10:26:02</td>
                </tr>
                <tr>
      
                  <td>400</td>
                  <td>city bank</td>
                  <td>Wallet</td>
                  <td>Tue May 09 2023 10:26:02</td>
                </tr>
                <tr>
     
                  <td>250</td>
                  <td>city bank</td>
                  <td>Wallet</td>
                  <td>Tue May 09 2023 10:26:02</td>
                </tr>
                <tr>
     
                  <td>5000</td>
                  <td>city bank</td>
                  <td>Wallet</td>
                  <td>Tue May 09 2023 10:26:02</td>
                </tr>
    
              </tbody>
            </table>
          </div>
                
                
        </div>
      </div>
    </>
  )
}

export default Transaction