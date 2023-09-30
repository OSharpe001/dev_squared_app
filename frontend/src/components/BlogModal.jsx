import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


export default function BlogModal({ blogModalHidden, setBlogModalHidden, loggedIn, currentBlog, blogToUpdate }) {

    const autoFocus = useEffect;
    const updateBlogFill = useEffect;
    const blogTitleInput = useRef();
    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");

    const [blogFormData, setBlogFormData] = useState({
        blogTitle: "",
        blogText: "",
        userName: loggedIn.userName,
        update: false,
        ready: false,
    });

    const handleTitleChange = ({ target }) => {
        setBlogTitle(target.value);
    };

    const handleTextChange = ({ target }) => {
        setBlogText(target.value);
    };

    const cancelBlog = () => {
        setBlogFormData(prev => ({
            ...prev,
            blogTitle: "",
            blogText: "",
            update: false,
            ready: false,
        }));
        setBlogModalHidden(true);
    };

    const submitForm = () => {
        setBlogFormData(prev => ({
            ...prev,
            title: blogTitle,
            text: blogText,
            ready: true,
        }));
    };

    updateBlogFill(() => {
        if (blogToUpdate) {
            setBlogTitle(blogToUpdate.title);
            setBlogText(blogToUpdate.text);
            setBlogFormData(prev => ({
                ...prev,
                update: true,
            }));
        };
    }, [blogToUpdate]);

    autoFocus(()=> {
        if (!blogModalHidden) {
            blogTitleInput.current.focus();
        };
      }, [blogModalHidden]);

    useEffect(() => {
            if (blogFormData.ready && blogFormData.update) {
                console.log("15");
                const updateBlog = async () => {
                    const URL = `https://devsquaredbe.onrender.com/api/blogs/${currentBlog._id}`;
                    // const URL = `http://localhost:5011/api/blogs/${currentBlog._id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`,
                            "Content-Type": "application/json",
                        },
                    };
                    const blogData = {
                        title: blogFormData.title,
                        text: blogFormData.text,
                        userName: blogFormData.userName
                    };
                    console.log("------updateBlog INFO------");
                    console.log("blogData: ", blogData);
                    console.log("currentBlog._id: ", currentBlog._id);
                    console.log("blogData.title: ", blogData.title);
                    console.log("blogData.text: ", blogData.text);
                    console.log("blogData.userName: ", blogData.userName);
                    console.log("loggedIn.token: ", loggedIn.token);
                    console.log("blogFormData.ready: ", blogFormData.ready);
                    console.log("blogFormData.update: ", blogFormData.update);
                    try {
                        await axios.put(URL, blogData, config);
                    } catch (err) {
                        console.log("ERR.CONFIG: ", err.config);
                        console.log(err);
                    };
                };
                updateBlog();

        } else if (blogFormData.ready && !blogFormData.update) {
            console.log("16");
            const createBlog = async () => {
                const URL = "https://devsquaredbe.onrender.com/api/blogs/";
                // const URL = "http://localhost:5011/api/blogs/";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`,
                        "Content-Type": "application/json",
                    },
                };
                const blogData = {
                    title: blogFormData.title,
                    text: blogFormData.text,
                    userName: blogFormData.userName
                };
                console.log("------createBlog INFO------");
                console.log("blogData: ", blogData);
                console.log("blogData.title: ", blogData.title);
                console.log("blogData.text: ", blogData.text);
                console.log("blogData.userName: ", blogData.userName);
                console.log("loggedIn.token: ", loggedIn.token);
                console.log("blogFormData.ready: ", blogFormData.ready);
                console.log("blogFormData.update: ", blogFormData.update);
                try {
                    await axios.post(URL, blogData, config);
                } catch (err) {
                    console.log("ERR.CONFIG: ", err.config);
                    console.log(err);
                };
            };
            createBlog();
        };

    }, [blogFormData/*, loggedIn/*, currentBlog*/]);

    // console.log("BLOGFORMDATA: ", blogFormData);
    // console.log("BLOGTOUPDATE INFO: ", blogToUpdate);

    return (
        <form className={blogModalHidden ? "hidden" : "blog-modal modal"}>
            <input ref={blogTitleInput} type="text" className="modal-title" onChange={handleTitleChange} value={blogTitle} placeholder="Title" />
            <textarea className="modal-blog" onChange={handleTextChange} value={blogText} placeholder="What are your thoughts" />
            <button className="submit-text" onClick={submitForm}>submit</button>
            <button className="cancel" onClick={cancelBlog}>Cancel</button>
        </form>
    );
};