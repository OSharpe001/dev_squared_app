import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CurrentBlog, HomePage, Login, Register } from "./pages";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from 'react';


export default function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Header
        navigate={navigate}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route path="/sign-in" element={<Login
                                          setLoggedIn={setLoggedIn}
                                        />}/>
        <Route path="/sign-up" element={<Register
                                          setLoggedIn={setLoggedIn}
                                        />}/>
        <Route path="/blog" element={<CurrentBlog
                                        navigate={navigate}
                                        loggedIn={loggedIn}
                                      />}/>
        <Route path="/" element={<HomePage
                                    navigate={navigate}
                                    loggedIn={loggedIn}
                                  />}/>
      </Routes>
      <ToastContainer />
      <Footer />
    </>
  );
};
