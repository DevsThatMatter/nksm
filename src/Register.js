import React, { useState } from "react";
import "./Register.css";
import { auth } from "./firebase.js";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollno, setRollNo] = useState("");
  const [hostelno, setHostelNo] = useState("");

  const signUp = (e) => {
    if (!name) {
      return alert("Please enter full name!");
    }
    //checking valid email
    var check_email = "[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](nitkkr.ac.in)";
    var patt = new RegExp(check_email);
    var result = patt.test(email);
    if (!result) {
      alert("You can't use that email to register"); 
    }
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
      })
      .catch((error) => {
        alert(error + "change it");
      });
  };

  return (
    <div className="register__container">
      <div className="register">
        <img src="NKSM_logo.png" alt="nksm-logo" />

        <form onSubmit={signUp}>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter domain e-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Roll No"
            value={rollno}
            onChange={(e) => setRollNo(e.target.value)}
          />
          <label for="hostel">Hostel No:</label>
          <select
            id="hostel"
            name="hostel"
            value={hostelno}
            onChange={(e) => setHostelNo(e.target.value)}
          >
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
          <button type="submit">Register</button>
        </form>
        <p>
          Already a member?{"  "}
          <span className="register__login">Log In</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
