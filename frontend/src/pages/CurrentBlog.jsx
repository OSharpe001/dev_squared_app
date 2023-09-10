import React from 'react'

export default function CurrentBlog({ loggedIn, navigate }) {

    if (!loggedIn) {
        navigate("/sign-up")
    };

    return (
        <div>CurrentBlog</div>
    );
};