import { useState, useEffect } from 'react';
import axios from 'axios';


export default function BlogModal({ blogModalHidden, setBlogModalHidden, loggedIn, currentBlog, navigate }) {

    const [blogTitle, setBlogTitle] = useState("");
    const [blogText, setBlogText] = useState("");

    const [formData, setFormData] = useState({
        blogTitle: "",
        blogText: "",
        userName: loggedIn.userName
    });

    const handleTitleChange = ({ target }) => {
        setBlogTitle(target.value);
    };

    const handleTextChange = ({ target }) => {
        setBlogText(target.value);
    };

    const cancelBlog = () => {
        setFormData(prev => ({
            ...prev,
            blogTitle: "",
            blogText: ""
        }));
        setBlogModalHidden(true);
    };

    const submitForm = () => {
        setFormData(prev => ({
            ...prev,
            title: blogTitle,
            text: blogText,
            ready: true
        }));
    };

    useEffect(() => {
        if (currentBlog) {
            // console.log("BLOGMODAL'S CURRENT BLOG INFO: ", currentBlog._id);
            setBlogTitle(currentBlog.title);
            setBlogText(currentBlog.text);
            if (formData.ready) {
                const updateBlog = async () => {
                    // console.log("BEFORE PLACING IT IN URL: ", currentBlog._id);
                    const URL = `https://devsquaredbe.onrender.com/api/blogs/${currentBlog._id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`
                        },
                    };
                    try {
                        // await axios.put(URL, formData, config);
                        const response = await axios.put(URL, formData, config);
                        console.log("WHY ISN'T THE UPDATE FORM WORKING??: ", response);
                    } catch (err) {
                        console.log("UPDATE BLOG ERROR: ", err);
                    };
                };
                updateBlog();
            };
        } else if (formData.title && formData.text) {
            const createBlog = async () => {
                const URL = "https://devsquaredbe.onrender.com/api/blogs/";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.post(URL, formData, config);
                } catch (err) {
                    console.log("FETCH ERROR: ", err);
                };
            };
            createBlog();
        };
    }, [formData, loggedIn, currentBlog]);

    return (
        <form className={blogModalHidden ? "hidden" : "blog-modal modal"}>
            <input type="text" className="modal-title" onChange={handleTitleChange} value={blogTitle} placeholder="Title" />
            <textarea className="modal-blog" onChange={handleTextChange} value={blogText} placeholder="What are your thoughts" />
            <button className="submit-text" onClick={submitForm}>submit</button>
            <button className="cancel" onClick={cancelBlog}>Cancel</button>
        </form>
    );
};