import React from "react";
import { useNavigate} from "react-router-dom";
import "./index.css";
import Header from "../Header";
import SideBar from "../SideBar";
function Transaction() {
    const navigate = useNavigate();

    const navigateTo =() =>{
        navigate('/');
      }
    return(
        <>

        <Header page={"dashboard"}></Header>
              <div className="container-fluid content-area">
                <div className="row flex-nowrap">
                <SideBar />
                <div className="col py-3">
<h3>Transaction List</h3>
                <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Amount</th>
      <th scope="col">From</th>
      <th scope="col">To</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>chitra</td>
      <td>city bank</td>
      <td>Wallet</td>
      <td>Tue May 09 2023 10:26:02</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>chitra</td>
      <td>city bank</td>
      <td>Wallet</td>
      <td>Tue May 09 2023 10:26:02</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>chitra</td>
      <td>city bank</td>
      <td>Wallet</td>
      <td>Tue May 09 2023 10:26:02</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>chitra</td>
      <td>city bank</td>
      <td>Wallet</td>
      <td>Tue May 09 2023 10:26:02</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>chitra</td>
      <td>city bank</td>
      <td>Wallet</td>
      <td>Tue May 09 2023 10:26:02</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>chitra</td>
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