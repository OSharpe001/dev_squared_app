import { useState, useEffect } from 'react';
import axios from 'axios';


export default function BlogModal({ blogModalHidden, setBlogModalHidden, loggedIn, currentBlog }) {

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
            setBlogTitle(currentBlog.title);
            setBlogText(currentBlog.text);
            if (formData.ready) {
                const updateBlog = async () => {
                    const URL = `https://devsquaredbe.onrender.com/api/blogs/${currentBlog._id}`;
                    // const URL = `http://localhost:5011/api/blogs/${currentBlog._id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`
                        },
                    };
                    try {
                        await axios.put(URL, formData, config);
                    } catch (err) {
                        console.log(err);
                    };
                };
                updateBlog();
            };
        } else if (formData.title && formData.text) {
            const createBlog = async () => {
                const URL = "https://devsquaredbe.onrender.com/api/blogs/";
                // const URL = "http://localhost:5011/api/blogs/";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.post(URL, formData, config);
                } catch (err) {
                    console.log(err);
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