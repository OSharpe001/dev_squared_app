import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Hero from '../components/Hero';
// import { grabUserName } from '../features/grabUserName';
// import axios from 'axios';

// import { fetchFromAPI } from '../features/handleAPICall';


export default function HomePage({ setBlogId, loggedIn, navigate }) {

    // console.log("HOMEPAGE'S LOGGEDIN INFO: ", loggedIn);

    const [blogs, setBlogs] = useState([]);
    console.log("HOMEPAGE'S BLOGS INFO: ", blogs)

    useEffect(() => {
        if (!loggedIn) {
            navigate("/sign-up")
        };

        const getAllBlogs = async () => {
            const URL = "http://localhost:5011/api/blogs";
            const options = { method: "GET" };

            try {
                const response = await fetch(URL, options);
                const data = await response.json();
                setBlogs(data);
            } catch (err) {
                console.log("FETCH ERROR: ", err)
            };
        };
        getAllBlogs();
    }, [loggedIn, navigate]);

    if (blogs.length < 1) {
        return (
            <div className='home-page'>
                <Spinner />
            </div>
        );
    };

    // const getUserName = async (id) => {

    // }

    // grabUserName();
    return (
        <div className='home-page'>
            <h1 className='title'>Welcome Back to Dev^2, {loggedIn.userName}!</h1>

            <Hero />
            <ul>
            <h2 className='announcement'>Create A New Blog <span className='underlined'>or</span> Check Out Previous Ones!</h2>
            <button className="create-blog-button">Create Blog</button>
            </ul>

            <ul className="bloglist">
                {blogs.map(blog => (
                    <div key={blog._id} >
                        <li className='homepage-blog'>
                            <button className="blog-item" onClick={() => setBlogId(blog._id)}>{blog.title}</button>
                            
                            <p className="author">By: {blog.user}</p>
                            <p className="created">{new Date(blog.updatedAt).toLocaleString().split(",")[0]}</p>
                            <p className="likes">Likes: {}</p>

                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};