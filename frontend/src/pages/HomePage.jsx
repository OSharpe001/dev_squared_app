// import React from 'react';


export default function HomePage({ loggedIn, navigate }) {

    if (!loggedIn) {
        navigate("/sign-up")
    };

    return (
        <div className='home-page'>
            <h1 className='title'>HomePage</h1>
        </div>
    );
};