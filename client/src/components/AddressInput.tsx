import "../App.css"
import axios from "axios";
import { useState } from "react";
import earth from "../assets/pixelearth.png"

function AddressInput() {
  const [address, setAddress] = useState({address: ""})

  const handleChange = (e) => {
    const addressValue = e.target.value
    setAddress({address: addressValue})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const addressData = {address: address};
    axios
    .post("http://localhost:3001/address", addressData).then((result) => {
      console.log(result.status, result.data);
      
    })
    .catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
    <div className="earth-container">
      <img src={earth} id="earth" />
    </div>
    
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange}  type="text" name="address" placeholder="Enter Address" className="address-input" />
        <button type="submit" className="submit-btn" >Submit</button>
      </form>
    </div>
    </>
  );
}



export default AddressInput;
