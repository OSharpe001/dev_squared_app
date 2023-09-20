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
  const [blogModalHidden, setBlogModalHidden] = useState(true);
  const [allLikes, setAllLikes] = useState([]);
  const [changeLike, setChangeLike] = useState({
    userName: loggedIn.userName,
    blogId: "",
    commentId: "",
    action: ""
});

  const navigate = useNavigate();
  const backToRegistration = useEffect;
  const backHome = useEffect;

  backToRegistration(() => {
    if (!loggedIn) {
      localStorage.removeItem("Dev2User");
      setBlogId("");
      navigate("/sign-up");
    };
  }, [loggedIn]);

  backHome(() => {
    if (loggedIn && !blogId) {
      setCurrentBlog("");
      navigate("/");
    }
  }, [loggedIn, blogId]);

  useEffect(() => {
    if (loggedIn && blogId) {
      const getCurrentBlog = async () => {
        // const URL = `https://devsquaredbe.onrender.com/api/blogs/${blogId}`;
        const URL = `http://localhost:5011/api/blogs/${blogId}`;
        try {
          const response = await axios.get(URL);
          setCurrentBlog(response.data);
        } catch (err) {
          alert("an Error occurred. Please try, again.")
          console.log(err);
        };
        navigate("/blog");
      };

      const getRelevantComments = async () => {
        // const URL = "https://devsquaredbe.onrender.com/api/blogs/comments/";
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

      getCurrentBlog();
      getRelevantComments();
    } else {
      setCurrentBlog("");
      setBlogComments([]);
    };

    // GET ALL LIKES
    const getAllLikes = async () => {
      // const URL = "https://devsquaredbe.onrender.com/api/likes/";
      const URL = "http://localhost:5011/api/likes/";
      const options = { method: "GET" };
      try {
        const response = await fetch(URL, options);
        const data = await response.json();
        setAllLikes(data);
      } catch (err) {
        console.log("ALL LIKES FETCH ERROR: ", err)
      };
    };
    getAllLikes();

  }, [blogId, loggedIn, navigate, changeLike]);



  return (
    <>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        setBlogId={setBlogId}
      />
      <Routes>
        <Route path="/sign-in" element={<Login
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
          navigate={navigate}
        />} />
        <Route path="/sign-up" element={<Register
          setLoggedIn={setLoggedIn}
          navigate={navigate}
        />} />
        <Route path="/blog" element={<CurrentBlog
          currentBlog={currentBlog}
          navigate={navigate}
          loggedIn={loggedIn}
          blogComments={blogComments}
          blogModalHidden={blogModalHidden}
          setBlogModalHidden={setBlogModalHidden}
          allLikes={allLikes}
          changeLike={changeLike}
          setChangeLike={setChangeLike}
          setBlogId={setBlogId}
        />} />
        <Route path="/" element={<HomePage
          navigate={navigate}
          loggedIn={loggedIn}
          setBlogId={setBlogId}
          blogModalHidden={blogModalHidden}
          setBlogModalHidden={setBlogModalHidden}
          allLikes={allLikes}
        />} />
      </Routes>
      <Footer />
    </>
  );
};
