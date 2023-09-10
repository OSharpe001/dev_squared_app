// import React from 'react';


export default function CurrentBlog({ loggedIn, navigate }) {

    if (!loggedIn) {
        navigate("/sign-up")
    };

    return (
        <div className="current-blog-page">
            <h1 className="title">CurrentBlog</h1>
        </div>
    );
};