import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

  const currentScreen = useLocation().pathname;
  const navigate = useNavigate();
  const backToRegistration = useEffect;

  backToRegistration(() => {
    if (!loggedIn) {
      console.log("1");
      localStorage.removeItem("Dev2User");
      setBlogId("");
      setCurrentBlog("");
      setBlogComments([]);
      navigate("/sign-up");
    };
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn && blogId) {
      const getCurrentBlog = async () => {
        console.log("2");
        const URL = `https://devsquaredbe.onrender.com/api/blogs/${blogId}`;
        // const URL = `http://localhost:5011/api/blogs/${blogId}`;
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
        console.log("3");
        const URL = "https://devsquaredbe.onrender.com/api/blogs/comments/";
        // const URL = "http://localhost:5011/api/blogs/comments/";
        const options = { method: "GET" };
        try {
          const response = await fetch(URL + blogId, options);
          const data = await response.json();
          setBlogComments(data.reverse());
        } catch (err) {
          console.log(err)
        };
      };
      getCurrentBlog();
      getRelevantComments();
    } else if (loggedIn && !blogId) {
      console.log("4");
      setCurrentBlog("");
      navigate("/");
    };

    // GIVING AND TAKING-BACK "LIKES" (BLOGS AND COMMENTS) FUNCTIONS
    if (changeLike.action === "delete" && changeLike.blogId) {
      console.log("5");
      const blogLikeDeletion = async () => {
        const blogLikeId = changeLike.blogId;
        const URL = `https://devsquaredbe.onrender.com/api/likes/${blogLikeId}`;
        // const URL = `http://localhost:5011/api/likes/${blogLikeId}`;
        const config = {
          headers: {
            Authorization: `Bearer ${loggedIn.token}`
          },
        };
        try {
          await axios.delete(URL, config);
        } catch (err) {
          console.log(err);
        };
        setChangeLike({
          userName: loggedIn.userName,
          blogId: "",
          commentId: "",
          action: ""
        });
      };
      blogLikeDeletion();

    } else if (changeLike.action === "add" && changeLike.blogId) {
      console.log("6");
      const createBlogLike = async () => {
        const URL = "https://devsquaredbe.onrender.com/api/likes";
        // const URL = "http://localhost:5011/api/likes";
        const options = {
          userName: changeLike.userName,
          blogId: changeLike.blogId
        };
        const config = {
          headers: {
            Authorization: `Bearer ${loggedIn.token}`
          },
        };
        try {
          await axios.post(URL, options, config);
        } catch (err) {
          console.log(err);
        };
        setChangeLike({
          userName: loggedIn.userName,
          blogId: "",
          commentId: "",
          action: ""
        });
      };
      createBlogLike();

    } else if (changeLike.action === "delete" && changeLike.commentId) {
      console.log("7");
      const commentLikeDeletion = async () => {
        const commentLikeId = changeLike.commentId;
        const URL = `https://devsquaredbe.onrender.com/api/likes/${commentLikeId}`;
        // const URL = `http://localhost:5011/api/likes/${commentLikeId}`;
        const config = {
          headers: {
            Authorization: `Bearer ${loggedIn.token}`
          },
        };
        try {
          await axios.delete(URL, config);
        } catch (err) {
          console.log(err);
        };
        setChangeLike({
          userName: loggedIn.userName,
          blogId: "",
          commentId: "",
          action: ""
        });
      };
      commentLikeDeletion();

    } else if (changeLike.action === "add" && changeLike.commentId) {
      console.log("8");
      const createCommentLike = async () => {
        const URL = "https://devsquaredbe.onrender.com/api/likes";
        // const URL = "http://localhost:5011/api/likes";
        const options = {
          userName: changeLike.userName,
          commentId: changeLike.commentId
        };
        const config = {
          headers: {
            Authorization: `Bearer ${loggedIn.token}`
          },
        };
        try {
          await axios.post(URL, options, config);
        } catch (err) {
          console.log(err);
        };
        setChangeLike({
          userName: loggedIn.userName,
          blogId: "",
          commentId: "",
          action: ""
        });
      };
      createCommentLike();
    };

    // GET ALL LIKES
    if (loggedIn) {
      const getAllLikes = async () => {
        console.log("9");
        const URL = "https://devsquaredbe.onrender.com/api/likes/";
        // const URL = "http://localhost:5011/api/likes/";
        const options = { method: "GET" };
        try {
          const response = await fetch(URL, options);
          const data = await response.json();
          setAllLikes(data);
        } catch (err) {
          console.log(err)
        };
      };
      getAllLikes();
    };

  }, [blogId, loggedIn, changeLike/*, navigate*/]);



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
          currentScreen={currentScreen}
        />} />
        <Route path="/sign-up" element={<Register
          setLoggedIn={setLoggedIn}
          currentScreen={currentScreen}
        />} />
        <Route path="/blog" element={<CurrentBlog
          currentBlog={currentBlog}
          loggedIn={loggedIn}
          blogComments={blogComments}
          blogModalHidden={blogModalHidden}
          setBlogModalHidden={setBlogModalHidden}
          allLikes={allLikes}
          setChangeLike={setChangeLike}
          setBlogId={setBlogId}

          navigate={navigate}
          changeLike={changeLike}
        />} />
        <Route path="/" element={<HomePage
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
