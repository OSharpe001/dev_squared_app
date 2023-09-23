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
    if (loggedIn) {
      console.log("APP.JS USEEFFECT'S IF LOGGEDIN IS RUNNING");
      navigate("/");
    } else
    if (!loggedIn) {
      console.log("APP.JS BACKTOREGISTRATION IS RUNNING");
      localStorage.removeItem("Dev2User");
      setBlogId("");
      setCurrentBlog("");
      setBlogComments([]);
      navigate("/sign-up");
    };
  }, [loggedIn]);

  backHome(() => {
    if (loggedIn && !blogId) {
      console.log("APP.JS BACKHOME IS RUNNING");
      setCurrentBlog("");
      navigate("/");
    }
  }, [blogId]);

  useEffect(() => {
    if (loggedIn && blogId) {
      const getCurrentBlog = async () => {
        console.log("APP.JS USEEFFECT'S GETCURRENTBLOG IS RUNNING");
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
        console.log("APP.JS USEEFFECT'S GETRELEVANTCOMMENTS IS RUNNING");
        const URL = "https://devsquaredbe.onrender.com/api/blogs/comments/";
        // const URL = "http://localhost:5011/api/blogs/comments/";
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
    };

    // GIVING AND TAKING-BACK "LIKES" (BLOGS AND COMMENTS) FUNCTIONS
    if (changeLike.action === "delete" && changeLike.blogId) {
      const blogLikeDeletion = async () => {
        const blogLikeId = changeLike.blogId;
        console.log("RUNNING THE BLOG-LIKE DELETE USEEFFECT METHOD WITH THE ID OF... ", blogLikeId);
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
          console.log("BLOG-LIKE DELETE FETCH ERROR: ", err);
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
      const createBlogLike = async () => {
        console.log("CURRENTBLOG USEEFFECT'S CREATEBLOGLIKE IS RUNNING");
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
          console.log("ADD BLOG-LIKE FETCH ERROR: ", err);
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
      const commentLikeDeletion = async () => {
        const commentLikeId = changeLike.commentId;
        console.log("RUNNING THE COMMENT-LIKE DELETE USEEFFECT METHOD WITH THE ID OF... ", commentLikeId);
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
          console.log("COMMENT-LIKE DELETE FETCH ERROR: ", err);
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
      const createCommentLike = async () => {
        console.log("CURRENTBLOG USEEFFECT'S CREATECOMMENTLIKE IS RUNNING");
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
          console.log("ADD COMMENT-LIKE FETCH ERROR: ", err);
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
    const getAllLikes = async () => {
      console.log("APP.JS USEEFFECT'S GETALLLIKES IS RUNNING");
      const URL = "https://devsquaredbe.onrender.com/api/likes/";
      // const URL = "http://localhost:5011/api/likes/";
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

  }, [blogId, loggedIn, changeLike]);



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
        />} />
        <Route path="/sign-up" element={<Register
          setLoggedIn={setLoggedIn}
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
