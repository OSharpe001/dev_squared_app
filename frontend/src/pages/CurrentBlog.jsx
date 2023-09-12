import { useState, useEffect } from 'react';
import CommentModal from '../components/CommentModal';


export default function CurrentBlog({ currentBlog, blogComments, loggedIn, navigate }) {

    const [commentModalHidden, setCommentModalHidden] = useState(true);
    const [commentToDelete, setCommentToDelete] = useState("");

    useEffect(() => {
        if (!loggedIn) {
            navigate("/sign-up");
        };

        if (loggedIn && !currentBlog) {
            navigate("/");
        };

        // *************************
        if (commentToDelete) {
            const commentDeletion = async () => {
                const URL = "http://localhost:5011/api/blogs/comments/";
                const options = { method: "DELETE" };
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await fetch(URL + commentToDelete, config, options);
                } catch (err) {
                    console.log("RELEVANT COMMENTS FETCH ERROR: ", err)
                };
            };
            commentDeletion();
        };
        // *************************

    }, [loggedIn, currentBlog, navigate, commentToDelete]);

    const startComment =() => {
        setCommentModalHidden(false);
    };

    // console.log("**CURRENTBLOGS CURRENTBLOG VALUE: ", currentBlog);
    // console.log("**CURRENTBLOGS LOGGEDIN INFO: ", loggedIn);
    // console.log("CURRENTBLOGS COMMENTS INFO: ", blogComments);
    // console.log("CURRENTBLOGS COMMENTTODELETE VALUE: ", commentToDelete);

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

            <div className="comment-section">
                <h3 className="blog-title underlined">Comments</h3>
                <ul className='comments'>
                    {blogComments.map(comment => (
                        <li>
                            <div className="comment-info">
                                <p className="author">By: {comment.userName}</p>
                                <p className="created">{new Date(comment.updatedAt).toLocaleString().split(",")[0]}</p>
                            </div>
                            <p className="comment" key={comment.id}>{comment.text}</p>
                            {comment.userName === loggedIn.userName ?
                                <div className='ud-buttons'>
                                    <button>Edit</button>
                                    <button onClick={() => setCommentToDelete(comment._id)}>Delete</button>
                                </div>
                            :
                                <button>Love</button>
                            }
                        </li>
                    ))}
                </ul>
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