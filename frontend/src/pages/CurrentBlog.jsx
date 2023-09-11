// import React from 'react';


export default function CurrentBlog({ currentBlog ,loggedIn, navigate }) {

    if (!loggedIn) {
        navigate("/sign-up")
    };

    console.log("CURRENTBLOGS CURRENTBLOG VALUE: ", currentBlog)

    return (
        <section className="current-blog-page">
            <div className="blog-info">
                <h1 className="title">{currentBlog.title}</h1>
                <p className="current-blog-author">By: {currentBlog.user}</p>
                <p className="current-blog-date">{new Date(currentBlog.updatedAt).toLocaleString().split(",")[0]}</p>
            </div>

            <section className="blog-text">{currentBlog.text}</section>
            
        </section>
    );
};