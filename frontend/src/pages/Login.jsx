import { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";


export default function Login({ setLoggedIn, currentScreen }) {

  const autoFocus = useEffect;
  const aliasInput = useRef();
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [aliasErrorMessage, setAliasErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const resetAlias = () => {
    setAlias("");
  };

  const resetPassword = () => {
    setPassword("");
  };

  const resetLoginForm = () => {
    resetAlias();
    resetPassword();
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (alias.includes("@") && alias.includes(".")) {
      setFormData({
        email: alias,
        password: password
      });
    } else {
      setFormData({
        userName: alias,
        password: password
      });
    };
    resetLoginForm();
  };

  const handleChange = ({ target }) => {
    if (target.name === "alias") {
      setAlias(target.value);
      if (target.value.length >= 4) {
        setAliasErrorMessage("");
      };
    } else {
      setPassword(target.value);
      if (target.value.length >= 7) {
        setPasswordErrorMessage("");
      };
    };
  };

  autoFocus(()=> {
    if (currentScreen === "/sign-in") {
        aliasInput.current.focus();
    };
  }, [currentScreen]);

  useEffect(() => {
    if (formData.password) {
        const getMe = async () => {
        const URL = `/api/users/login`;
        try {
          const response = await axios.post(URL, formData);
          localStorage.setItem("Dev2User", JSON.stringify(response.data));
          setLoggedIn(JSON.parse(localStorage.getItem("Dev2User")));
        } catch (err) {
          console.log(err);
          alert("Try again or register");
          resetPassword();
        };
      };
      getMe();
    };
  }, [formData, setLoggedIn]);

  const errorHandling = ({ target }) => {
    if (target.name === "alias" && alias.length < 4) {
      setAliasErrorMessage("Place username or email");
    } else if (alias.length >= 4) {
      setAliasErrorMessage("");
    };
    if (target.name === "password" && password.length < 8) {
      setPasswordErrorMessage("Needs at least 8 characters");
    } else if (password.length >= 8) {
      setPasswordErrorMessage("");
    };
  };

  const incomplete = aliasErrorMessage || passwordErrorMessage || !alias || !password;

  return (
    <div className='login-page'>
      <h1 className="welcome">Welcome back to Dev Squared!</h1>
      <h1 className="direct">Login <span className="underlined">or</span> <Link aria-label="On Click" to="/sign-up">Register</Link></h1>
      <form>
        <label htmlFor="alias">UserName <span className='underlined'>or</span> Email:</label>
        <input ref={aliasInput} onChange={handleChange} onBlur={errorHandling} type="text" name="alias" id="alias" placeholder='jd@email.com' value={alias} />
        <p className="error-message">{aliasErrorMessage}</p>

        <label htmlFor="password">Password:</label>
        <input onChange={handleChange} onBlur={errorHandling} type="password" name="password" id="password" value={password} />
        <p className="error-message">{passwordErrorMessage}</p>

        <button onClick={submitForm} disabled={incomplete}>Submit</button>
      </form>
    </div>
  );
};