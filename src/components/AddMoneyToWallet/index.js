import React, { useState } from "react";
import "./index.css";

/**
 * Top Repos List
 *
 * @description: Shows the list of Top Repos for a Github User
 * @returns Bootstrap List Group of Top Repos
 */
function AddMoneyToWallet() {
    const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(inputs);
  }

   

   

    return (
        <div className="outer-container">
        <form onSubmit={handleSubmit}>
            <div className="header"> Add Money to Wallet</div>
            <div className="content">
            <div class="mb-3">
  <label htmlFor="amount" class="form-label lable-align">Enter amount</label>
 <input type="text" minlength="5" name="amount" value={inputs.amount || ""} 
        onChange={handleChange} maxLength="64" placeholder="Enter amount" className="form-control" id="amount"  required="true"/>
</div>
         
<div class="button-container">
<button type="button" className="btn btn-outline-secondary text-left">&#x20b9; 100</button>
<button type="button" className="btn btn-outline-secondary text-center button-align">&#x20b9; 500</button>
<button type="button" className="btn btn-outline-secondary text-right button-align">&#x20b9; 1000</button>
</div>
<div class="row submit">
<button className="btn btn-primary"  style={{ backgroundColor: '#0047AB'}} type="submit">Continue</button>
</div>
</div>
</form>
        </div>
    );
}

export default AddMoneyToWallet;
