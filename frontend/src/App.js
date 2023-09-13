import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentBlog, HomePage, Login, Register } from "./pages";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function App() {

  const [loggedIn, setLoggedIn] = useState(JSON.parse(localStorage.getItem("Dev2User")) ? JSON.parse(localStorage.getItem("Dev2User")) : false);
  const [currentBlog, setCurrentBlog] = useState("");
  const [blogId, setBlogId] = useState("");
  const [blogComments, setBlogComments] = useState([]);
  const [blogModalHidden, setblogModalHidden] = useState(true);

  const navigate = useNavigate();
  console.log("APP'S CURRENT BLOGID VALUE: ", blogId);

  useEffect(() => {
    const getCurrentBlog = async () => {
      if (loggedIn && !blogId) {
        setCurrentBlog("");
        navigate("/");
      } else if (blogId) {
        const URL = `http://localhost:5011/api/blogs/${blogId}`;
        const response = await axios.get(URL);
        // console.log("APP.JS' GETCURRENTBLOG VALUE: ", response.data);
        try {
          await setCurrentBlog(response.data);
        } catch (err) {
          alert("an Error occurred. Please try, again.")
          console.log(err);
        };
        navigate("/blog");
      };
    };

    const getRelevantComments = async () => {
      const URL = "http://localhost:5011/api/blogs/comments/";
      const options = { method: "GET" };

      try {
          const response = await fetch(URL + blogId, options);
          const data = await response.json();
          setBlogComments(data.reverse());
      } catch (err) {
          console.log("RELEVANT COMMENTS FETCH ERROR: ", err)
      };
  };

    getRelevantComments();
    getCurrentBlog();
  }, [blogId, loggedIn, navigate]);

  return (
    <>
      <Header
        navigate={navigate}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setBlogId={setBlogId}
        setCurrentBlog={setCurrentBlog}
      />
      <Routes>
        <Route path="/sign-in" element={<Login
                                          setLoggedIn={setLoggedIn}
                                          loggedIn={loggedIn}
                                          navigate={navigate}
                                        />}/>
        <Route path="/sign-up" element={<Register
                                          setLoggedIn={setLoggedIn}
                                          navigate={navigate}
                                        />}/>
        <Route path="/blog" element={<CurrentBlog
                                        currentBlog={currentBlog}
                                        navigate={navigate}
                                        loggedIn={loggedIn}
                                        blogComments={blogComments}
                                        blogModalHidden={blogModalHidden}
                                        setblogModalHidden={setblogModalHidden}
                                      />}/>
        <Route path="/" element={<HomePage
                                    navigate={navigate}
                                    loggedIn={loggedIn}
                                    setBlogId={setBlogId}
                                    blogModalHidden={blogModalHidden}
                                    setblogModalHidden={setblogModalHidden}
                                  />}/>
      </Routes>
      <Footer />
    </>
  );
};
