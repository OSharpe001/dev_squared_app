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
  const [blogToUpdate, setBlogToUpdate] = useState("");

  const [changeLike, setChangeLike] = useState({
    userName: loggedIn.userName,
    blogId: "",
    commentId: "",
    action: ""
  });

  const updateBlog = (blogInfo) => {
    setBlogToUpdate(blogInfo);
    setBlogModalHidden(false);
};

  const [blogFormData, setBlogFormData] = useState({
    title: "",
    text: "",
    userName: loggedIn.userName,
    update: false,
    ready: false
  });

  const currentScreen = useLocation().pathname;
  const navigate = useNavigate();
  const backToRegistration = useEffect;
  const updateBlogFill = useEffect;

  const handleBlogTitleChange = ({ target }) => {
    setBlogFormData(prev => ({
        ...prev,
        title: target.value
    }));
};

const handleBlogTextChange = ({ target }) => {
    setBlogFormData(prev => ({
        ...prev,
        text: target.value
    }))
};

const cancelBlog = () => {
    setBlogFormData(prev => ({
        ...prev,
        title: "",
        text: "",
        update: false,
        ready: false
    }));
    setBlogModalHidden(true);
};

const submitBlogForm = () => {
    setBlogFormData(prev => ({
        ...prev,
        ready: true
    }));
    if (currentBlog._id) {
        setTimeout(setBlogId, 195, "");
        setTimeout(setBlogId, 200, currentBlog._id);
    };
};

updateBlogFill(() => {
    if (blogToUpdate) {
        setBlogFormData(prev => ({
            ...prev,
            title: blogToUpdate.title,
            text: blogToUpdate.text,
            update: true
        }));
    };
}, [blogToUpdate]);

  backToRegistration(() => {
    if (!loggedIn) {
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
        const URL = `/api/blogs/${blogId}`;
        try {
          const response = await axios.get(URL);
          setCurrentBlog(response.data);
        } catch (err) {
          console.log(err);
        };
        navigate("/blog");
      };

      const getRelevantComments = async () => {
        const URL = "/api/blogs/comments/";
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
    } else if (loggedIn.name && !blogId) {
      setCurrentBlog("");
      navigate("/");
    };

    // GIVING AND TAKING-BACK "LIKES" (BLOGS AND COMMENTS) FUNCTIONS
    if (changeLike.action === "delete" && changeLike.blogId) {
      const blogLikeDeletion = async () => {
        const blogLikeId = changeLike.blogId;
        const URL = `/api/likes/${blogLikeId}`;
        const config = {
          headers: {
            Authorization: `Bearer ${loggedIn.token}`
          }
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
      const createBlogLike = async () => {
        const URL = "/api/likes";
        const options = {
          userName: changeLike.userName,
          blogId: changeLike.blogId
        };
        const config = {
          headers: {
            Authorization: `Bearer ${loggedIn.token}`
          }
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
      const commentLikeDeletion = async () => {
        const commentLikeId = changeLike.commentId;
        const URL = `/api/likes/${commentLikeId}`;
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
      const createCommentLike = async () => {
        const URL = "/api/likes";
        const options = {
          userName: changeLike.userName,
          commentId: changeLike.commentId
        };
        const config = {
          headers: {
            Authorization: `Bearer ${loggedIn.token}`
          }
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
    if (loggedIn.name) {
      const getAllLikes = async () => {
        const URL = "/api/likes/";
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

    if (blogFormData.ready && blogFormData.update) {
      const updateBlog = async () => {
        const URL = `/api/blogs/${currentBlog._id}`;
        const config = {
          headers: {
              Authorization: `Bearer ${loggedIn.token}`
          }
        };
        const blogData = {
          title: blogFormData.title,
          text: blogFormData.text,
          userName: blogFormData.userName
        };
        try {
          await axios.put(URL, blogData, config);
        } catch (err) {
          console.log(err);
        };
      };
      updateBlog();

    } else if (blogFormData.ready && !blogFormData.update) {
      const createBlog = async () => {
        const URL = "/api/blogs/";
        const config = {
          headers: {
              Authorization: `Bearer ${loggedIn.token}`
          }
        };
        const blogData = {
          title: blogFormData.title,
          text: blogFormData.text,
          userName: blogFormData.userName
        };
        try {
          await axios.post(URL, blogData, config);
        } catch (err) {
          console.log(err);
        };
      };
      createBlog();
    };

  }, [blogId, loggedIn.name, changeLike.action, blogFormData.ready]);

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
          blogFormData={blogFormData}
          blogToUpdate={blogToUpdate}
          updateBlog={updateBlog}
          handleBlogTitleChange={handleBlogTitleChange}
          handleBlogTextChange={handleBlogTextChange}
          cancelBlog={cancelBlog}
          submitBlogForm={submitBlogForm}

          navigate={navigate}
          changeLike={changeLike}
        />} />
        <Route path="/" element={<HomePage
          loggedIn={loggedIn}
          setBlogId={setBlogId}
          blogModalHidden={blogModalHidden}
          setBlogModalHidden={setBlogModalHidden}
          blogFormData={blogFormData}
          allLikes={allLikes}
          currentScreen={currentScreen}
          handleBlogTitleChange={handleBlogTitleChange}
          handleBlogTextChange={handleBlogTextChange}
          cancelBlog={cancelBlog}
          submitBlogForm={submitBlogForm}
        />} />
      </Routes>
      <Footer />
    </>
  );
};
