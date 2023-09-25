import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import Hero from '../components/Hero';
import BlogModal from '../components/BlogModal';
import like from "../assets/images/icons/filled_red_heart.png";


export default function HomePage({ setBlogId, loggedIn, blogModalHidden, setBlogModalHidden, allLikes }) {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        const getAllBlogs = async () => {
            try {
                const URL = "https://devsquaredbe.onrender.com/api/blogs";
                // const URL = "http://localhost:5011/api/blogs";
                const options = { method: "GET" };

                const response = await fetch(URL, options);
                const data = await response.json();
                setBlogs(data.reverse());
            } catch (err) {
                console.log(err);
            };
        };
        getAllBlogs();

    }, []);

    const createBlog = () => {
        setBlogModalHidden(false);
    };

    const goToBlog = (blog) => {
        setBlogModalHidden(true);
        setBlogId(blog);
    };

    const disabled = !blogModalHidden;

    if (blogs.length < 1) {
        return (
            <div className='home-page'>
                <Spinner />
            </div>
        );
    };

    return (
        <div className='home-page'>
            <h1 className='welcome'>Welcome Back to Dev^2, {loggedIn.userName}!</h1>

            <Hero />
            <ul>
            <h2 className='announcement'>Create A New Blog <span className='underlined'>or</span> Check Out Previous Ones!</h2>
            <button className="create-blog-button" disabled={disabled} onClick={createBlog}>Create Blog</button>
            </ul>

            <ul className="bloglist">
                {blogs.map(blog => (
                    <div key={blog._id} >
                        <li className='homepage-blog'>
                            <button className="blog-item" disabled={disabled} onClick={() => goToBlog(blog._id)}>{blog.title}</button>

                            <p className="author underlined">By: {blog.userName}</p>
                            <p className="created">{new Date(blog.updatedAt).toLocaleString().split(",")[0]}</p>
                            <p className="likes"><img src={like} alt="likes-heart" className="heart"/> {allLikes.filter(like => (like.blogId === blog._id)).length}</p>
                        </li>
                    </div>
                ))}
            </ul>

            <BlogModal
                    loggedIn={loggedIn}
                    blogModalHidden={blogModalHidden}
                    setBlogModalHidden={setBlogModalHidden}
                />
        </div>
    );
};