import React from 'react'

export default function HomePage({ loggedIn, navigate }) {

    if (!loggedIn) {
        navigate("/sign-up")
      };

    return (
        <div>HomePage</div>
    );
};