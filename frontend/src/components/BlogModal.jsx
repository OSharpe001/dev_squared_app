import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


export default function BlogModal({ blogModalHidden, setBlogModalHidden, loggedIn, currentBlog, blogToUpdate, setBlogId }) {

    const autoFocus = useEffect;
    const updateBlogFill = useEffect;
    const blogTitleInput = useRef();

    const [blogFormData, setBlogFormData] = useState({
        title: "",
        text: "",
        userName: loggedIn.userName,
        update: false,
        ready: false,
    });

    const handleTitleChange = ({ target }) => {
        setBlogFormData(prev => ({
            ...prev,
            title: target.value
        }));
    };

    const handleTextChange = ({ target }) => {
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
            ready: false,
        }));
        setBlogModalHidden(true);
    };

    const submitBlogForm = () => {
        setBlogFormData(prev => ({
            ...prev,
            ready: true,
        }));
        if (currentBlog._id) {
            setTimeout(setBlogId, 195, "");
            setTimeout(setBlogId, 200, currentBlog._id);
        };
    };
    console.log("BLOGMODAL'S CURRENTBLOG INFO: ", currentBlog);

    updateBlogFill(() => {
        if (blogToUpdate) {
            setBlogFormData(prev => ({
                ...prev,
                title: blogToUpdate.title,
                text: blogToUpdate.text,
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
                        },
                    };
                    const blogData = {
                        title: blogFormData.title,
                        text: blogFormData.text,
                        userName: blogFormData.userName
                    };
                    // console.log("------updateBlog INFO------");
                    // console.log("blogData: ", blogData);
                    // console.log("currentBlog._id: ", currentBlog._id);
                    // console.log("blogData.title: ", blogData.title);
                    // console.log("blogData.text: ", blogData.text);
                    // console.log("blogData.userName: ", blogData.userName);
                    // console.log("loggedIn.token: ", loggedIn.token);
                    // console.log("blogFormData.ready: ", blogFormData.ready);
                    // console.log("blogFormData.update: ", blogFormData.update);
                    try {
                        await axios.put(URL, blogData, config);
                    } catch (err) {
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
                    },
                };
                const blogData = {
                    title: blogFormData.title,
                    text: blogFormData.text,
                    userName: blogFormData.userName
                };
                // console.log("------createBlog INFO------");
                // console.log("blogData: ", blogData);
                // console.log("blogData.title: ", blogData.title);
                // console.log("blogData.text: ", blogData.text);
                // console.log("blogData.userName: ", blogData.userName);
                // console.log("loggedIn.token: ", loggedIn.token);
                // console.log("blogFormData.ready: ", blogFormData.ready);
                // console.log("blogFormData.update: ", blogFormData.update);
                try {
                    await axios.post(URL, blogData, config);
                } catch (err) {
                    console.log(err);
                };
            };
            createBlog();
        };

    }, [blogFormData.ready/*, loggedIn/*, currentBlog*/]);

    // console.log("BLOGFORMDATA: ", blogFormData);
    // console.log("BLOGTOUPDATE INFO: ", blogToUpdate);

    return (
        <form className={blogModalHidden ? "hidden" : "blog-modal modal"}>
            <input ref={blogTitleInput} type="text" className="modal-title" onChange={handleTitleChange} value={blogFormData.title} placeholder="Title" />
            <textarea className="modal-blog" onChange={handleTextChange} value={blogFormData.text} placeholder="What are your thoughts" />
            <button className="submit-text" onClick={submitBlogForm}>submit</button>
            <button className="cancel" onClick={cancelBlog}>Cancel</button>
        </form>
    );
};