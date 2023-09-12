import { useState, useEffect } from 'react';
import CommentModal from '../components/CommentModal';


export default function CurrentBlog({ currentBlog , loggedIn, navigate }) {

    const [commentModalHidden, setCommentModalHidden] = useState(true);

    useEffect(() => {
        if (!loggedIn) {
            navigate("/sign-up");
        };
    
        if (loggedIn && !currentBlog) {
            navigate("/");
        };
    
      
    }, [loggedIn, currentBlog, navigate])
    
    

    const startComment =() => {
        setCommentModalHidden(false);
    };

    console.log("**CURRENTBLOGS CURRENTBLOG VALUE: ", currentBlog);
    console.log("**CURRENTBLOGS LOGGEDIN INFO: ", loggedIn);

    return (
        <section className="current-blog-page">
            <div className="blog">
                <h2 className="blog-title underlined">{currentBlog.title}</h2>
                <p className="blog-text">{currentBlog.text}</p>
                <div className="blog-info">
                    <p className="current-blog-author underlined">By: {currentBlog.user}</p>
                    <p className="current-blog-date underlined">{new Date(currentBlog.updatedAt).toLocaleString().split(",")[0]}</p>
                </div>
            </div>

            <div className="add-or-update">
            {loggedIn._id === currentBlog.user ?
                <>
                    <button>Delete</button>
                    <button>Edit</button>
                    <button onClick={startComment}>Comment</button>
                </>
            :
                <>
                    <button>Like</button>
                    <button>Comment</button>
                </>
            }
            </div>

            <CommentModal
                        commentModalHidden={commentModalHidden}
                        setCommentModalHidden={setCommentModalHidden}
                        loggedIn={loggedIn}
                        currentBlog={currentBlog}
                    />
            
        </section>
    );
};