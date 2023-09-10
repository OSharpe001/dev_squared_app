import { useState, useEffect } from 'react';
import axios from "axios";


export default function Login({ loggedIn, setLoggedIn, navigate }) {

  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

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

  const submitForm = (e) => {
    e.preventDefault();
    if (alias.includes("@")) {
      setFormData(prev => ({
        ...prev,
        email: alias,
        password: password
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        userName: alias,
        password: password
      }));
    }
  };

  const handleChange = ({ target }) => {
    if (target.name === "alias") {
      setAlias(target.value);
    } else {
      setPassword(target.value);
    }
  };

  useEffect(() => {
    const resetLoginForm = () => {
      resetAlias();
      resetPassword();
    };

    const getMe = async () => {
      const URL = `http://localhost:5011/api/users/login`;
      if (formData.password) {
        const response = await axios.post(URL, formData);
        try {
          localStorage.setItem("Dev2User", JSON.stringify(response.data));
          setLoggedIn(JSON.parse(localStorage.getItem("Dev2User")));
        } catch (err) {
          console.log(err);
          resetPassword();
        };
        return response.data
      };
      resetLoginForm();
    };
    getMe();
  }, [formData, setLoggedIn]);

  if (loggedIn) {
    navigate("/");
  };

  return (
    <div className='login-page'>
      <h1 className="title">Login <span className="underlined">or</span> <a href="/sign-up">Register</a></h1>
      <form action="">
        <label htmlFor="alias">UserName <span className='underlined'>or</span> Email:</label>
        <input onChange={handleChange} type="text" name="alias" id="alias" placeholder='jd@email.com' value={alias} />
        <label htmlFor="password">Password:</label>
        <input onChange={handleChange} type="password" name="password" id="password" value={password} />
        <button onClick={submitForm}>Submit</button>
      </form>
    </div>
  );
};