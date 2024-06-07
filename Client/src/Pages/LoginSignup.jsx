import "./CSS/LoginSignup.css";

import React, { useState } from "react";
// import { useDispatch } from "react-redux";

// @service
import { signIn } from "../service/authentication";
// import apiMethod from "../utility/apiMethod";

// @constants
import { SUCCESS } from "../constants";

// @components
import { notification } from "antd";
// import { getCart } from "../redux/cart/actions";

const LoginSignup = () => {
  // const dispatch = useDispatch()

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    try {
      setLoading(true)
      const payload = {
        username: userName,
        password
      }
      const res = await signIn(payload)
      if (res?.retCode === SUCCESS) {
        notification.success({
          message: "Successfully",
          description: res?.retText,
          duration: 2,
        })
        localStorage.setItem("USER_INFO", JSON.stringify(res?.retData))
        // apiMethod.defaults.headers.common["Authorization"] = res?.retData?.accessToken;
        // dispatch(getCart({ userId: res?.retData?.id }))
        setTimeout(() => {
          window.location.href = "/"
        }, 1000)
      } else {
        notification.error({
          message: "Fail",
          description: res?.retText,
          duration: 2,
        })
      }
      // console.log("RES", res)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
      notification.error({
        message: "Fail",
        description: err?.message,
        duration: 2,
      })
    } finally {
      setLoading(false)
    }
  }

  const signup = async () => {
    let dataObj;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data });

    if (dataObj.success) {
      localStorage.setItem('auth-token', dataObj.token);
      window.location.replace("/");
    }
    else {
      alert(dataObj.errors)
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input type="text" placeholder="Your name" name="username" value={formData.username} onChange={changeHandler} /> : <></>}
          <input type="email" placeholder="Email address" name="email" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button
          disabled={loading}
          onClick={() => { state === "Login" ? login() : signup() }}
        >
          Continue
        </button>

        {state === "Login" ?
          <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
          : <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
