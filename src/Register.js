import React, { useState } from "react";
import "./Register.css";

function Register() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  return (
    <div className="register__container">
      <div className="register">
        <img src="NKSM_logo.png" alt="" />
        <form>
          <input type="text" 
          placeholder="Enter Full Name" 
          />
          <input type="email" placeholder="Enter e-mail address" />
          <input type="password" placeholder="Enter Password" />
          <input type="number" placeholder="Enter Roll No" />
          <label for="hostel">Hostel No:</label>
          <select id="hostel" name="hostel">
            <option value="H1">H1</option>
            <option value="H2">H2</option>
            <option value="H3">H3</option>
            <option value="H4">H4</option>
            <option value="H5">H5</option>
            <option value="H6">H6</option>
            <option value="H7">H7</option>
            <option value="H8">H8</option>
            <option value="H9">H9</option>
            <option value="H10">H10</option>
            <option value="KC">KC</option>
            <option value="CB">CB</option>
            
          </select>
          <button type="submit">
            Register
          </button>
        </form>
        <p>
          Already a member?{"  "}
          <span className="register__login" >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
