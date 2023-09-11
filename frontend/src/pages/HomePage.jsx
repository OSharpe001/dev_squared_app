import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
// import axios from 'axios';

// import { fetchFromAPI } from '../features/handleAPICall';


export default function HomePage({ loggedIn, navigate }) {

    const [blogs, setBlogs] = useState([])


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
                console.log("HOMEPAGE'S USEEFFECT API CALL ISN'T WORKING!: ", err)
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


    return (
        <div className='home-page'>
            <h1 className='title'>HomePage</h1>

            <ul className="bloglist">
                {blogs.map(blog => (
                    <div key={blog._id} className='homepage-blog'>
                        <li onClick="....">
                            <p className="blog-item">{blog.title}</p>
                        </li>
                        <p className="author"></p>
                        <p className="created">{new Date(blog.updatedAt).toLocaleString().split(",")[0]}</p>
                        {/* <p className="likes"></p> */}
                    </div>
                ))}
            </ul>
        </div>
    );
};