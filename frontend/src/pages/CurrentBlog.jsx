import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentModal from '../components/CommentModal';
import BlogModal from '../components/BlogModal';
import like from "../assets/images/icons/filled_red_heart.png";
import dislike from "../assets/images/icons/heart_shell.png";


export default function CurrentBlog({ currentBlog, setBlogId, blogComments, loggedIn, navigate, blogModalHidden, setBlogModalHidden, allLikes }) {

    const [commentModalHidden, setCommentModalHidden] = useState(true);
    const [commentToDelete, setCommentToDelete] = useState("");
    const [blogToDelete, setBlogToDelete] = useState("");
    const [commentToUpdate, setCommentToUpdate] = useState("");
    const [changeLike, setChangeLike] = useState({
        userName: loggedIn.userName,
        blogId: "",
        commentId: "",
        action: ""
    });

    useEffect(() => {
        if (commentToDelete) {
            const commentDeletion = async () => {
                console.log("CURRENTBLOG USEEFFECT'S COMMENTDELETION IS RUNNING");
                const URL = "https://devsquaredbe.onrender.com/api/blogs/comments/";
                // const URL = "http://localhost:5011/api/blogs/comments/";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.delete(URL + commentToDelete, config);
                    // setBlogId(currentBlog._id); // DIDN'T WORK (TRYING TO RE-RENDER THE CURRENT BLOG AFTER A COMMENT DELETION)
                } catch (err) {
                    console.log("COMMENT DELETE FETCH ERROR: ", err);
                };
            };
            commentDeletion();
            // setBlogId(currentBlog._id); // DIDN'T WORK (TRYING TO RE-RENDER THE CURRENT BLOG AFTER A COMMENT DELETION)
        };

        if (blogToDelete) {
            const blogDeletion = async () => {
                console.log("CURRENTBLOG USEEFFECT'S BLOGDELETION IS RUNNING");
                const URL = "https://devsquaredbe.onrender.com/api/blogs/";
                // const URL = "http://localhost:5011/api/blogs/";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.delete(URL + blogToDelete, config);
                    setBlogId("");
                } catch (err) {
                    console.log("BLOG DELETE FETCH ERROR: ", err);
                };
            };
            blogDeletion();
        };

        if (changeLike.action === "delete" && changeLike.blogId) {
            const blogLikeDeletion = async () => {
                const blogLikeId = changeLike.blogId;
                console.log("RUNNING THE BLOG-LIKE DELETE USEEFFECT METHOD WITH THE ID OF... ", blogLikeId);
                const URL = `https://devsquaredbe.onrender.com/api/likes/${blogLikeId}`;
                // const URL = `http://localhost:5011/api/likes/${blogLikeId}`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.delete(URL, config);
                } catch (err) {
                    console.log("BLOG-LIKE DELETE FETCH ERROR: ", err);
                };
                // setChangeLike({
                //     userName: loggedIn.userName,
                //     blogId: "",
                //     commentId: "",
                //     action: ""
                // });
            };
            blogLikeDeletion();

        } else if (changeLike.action === "add" && changeLike.blogId) {
            const createBlogLike = async () => {
                console.log("CURRENTBLOG USEEFFECT'S CREATEBLOGLIKE IS RUNNING");
                const URL = "https://devsquaredbe.onrender.com/api/likes";
                // const URL = "http://localhost:5011/api/likes";
                const options = {
                    userName: changeLike.userName,
                    blogId: changeLike.blogId
                };
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.post(URL, options, config);
                } catch (err) {
                    console.log("ADD BLOG-LIKE FETCH ERROR: ", err);
                };
                // setChangeLike({
                //     userName: loggedIn.userName,
                //     blogId: "",
                //     commentId: "",
                //     action: ""
                // });
            };
            createBlogLike();

        } else if (changeLike.action === "delete" && changeLike.commentId) {
            const commentLikeDeletion = async () => {
                const commentLikeId = changeLike.commentId;
                console.log("RUNNING THE COMMENT-LIKE DELETE USEEFFECT METHOD WITH THE ID OF... ", commentLikeId);
                const URL = `https://devsquaredbe.onrender.com/api/likes/${commentLikeId}`;
                // const URL = `http://localhost:5011/api/likes/${commentLikeId}`;
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.delete(URL, config);
                } catch (err) {
                    console.log("COMMENT-LIKE DELETE FETCH ERROR: ", err);
                };
                // setChangeLike({
                //     userName: loggedIn.userName,
                //     blogId: "",
                //     commentId: "",
                //     action: ""
                // });
            };
            commentLikeDeletion();

        } else if (changeLike.action === "add" && changeLike.commentId) {
            const createCommentLike = async () => {
                console.log("CURRENTBLOG USEEFFECT'S CREATECOMMENTLIKE IS RUNNING");
                const URL = "https://devsquaredbe.onrender.com/api/likes";
                // const URL = "http://localhost:5011/api/likes";
                const options = {
                    userName: changeLike.userName,
                    commentId: changeLike.commentId
                };
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.post(URL, options, config);
                } catch (err) {
                    console.log("ADD COMMENT-LIKE FETCH ERROR: ", err);
                };
                // setChangeLike({
                //     userName: loggedIn.userName,
                //     blogId: "",
                //     commentId: "",
                //     action: ""
                // });
            };
            createCommentLike();
        };

    }, [loggedIn, currentBlog, navigate, commentToDelete, blogToDelete, changeLike, setBlogId]);

    const startComment = () => {
        setCommentModalHidden(false);
    };

    const updateComment = (info) => {
        setCommentToUpdate(info);
        setCommentModalHidden(false);
    };

    const changeLikeBlog = (action, blogId) => {
        setChangeLike(prev => ({
            ...prev,
            action: action,
            blogId: blogId
        }));
    };

    const changeLikeComment = (action, commentId) => {
        setChangeLike(prev => ({
            ...prev,
            action: action,
            commentId: commentId
        }));
    };

    const currentBlogLikeId = (blogId) => (
        allLikes.filter(like => like.blogId === blogId && like.userName === loggedIn.userName)[0]._id
    );

    const currentCommentLikeId = (commentId) => (
        allLikes.filter(like => like.commentId === commentId && like.userName === loggedIn.userName)[0]._id
    );

    const disabled = !blogModalHidden || !commentModalHidden;

    // console.log("CURRENTBLOG'S CURRENTBLOG INFO: ", currentBlog);

    return (
        <section className="current-blog-page">
            <div className="blog">
                <h2 className="blog-title underlined">{currentBlog.title}</h2>
                <p className="blog-text">{currentBlog.text}</p>
            </div>
            <div className="blog-info">
                <p className="current-blog-author underlined">By: {currentBlog.userName}</p>
                <p className="current-blog-date underlined">{new Date(currentBlog.updatedAt).toLocaleString().split(",")[0]}</p>
            </div>

            <div className="add-or-update">
                <button onClick={startComment} disabled={disabled}>Comment</button>
                {loggedIn._id === currentBlog.user ?
                    <>
                        <button onClick={() => setBlogToDelete(currentBlog._id)} disabled={disabled}>Delete</button>
                        <button onClick={() => setBlogModalHidden(false)} disabled={disabled}>Edit</button>
                    </>
                    :
                    <>
                        {allLikes.filter(like => like.blogId === currentBlog._id && like.userName === loggedIn.userName).length
                            ?
                            <button className="likes-button" onClick={() => changeLikeBlog("delete", currentBlogLikeId(currentBlog._id))}><img disabled={disabled} className="heart" src={like} alt="like" /></button>
                            :
                            <button className="likes-button" onClick={() => changeLikeBlog("add", currentBlog._id)}><img disabled={disabled} className="heart" src={dislike} alt="dislike" /></button>
                        }
                    </>
                }
            </div>

            <div className="comment-section">
                <h3 className="blog-title underlined">Comments</h3>
                <ul className='comments'>
                    {blogComments.map(comment => (
                        <li key={comment._id}>
                            <div className="comment-box">
                                <div className="comment-info">
                                    <p className="author">By: {comment.userName}</p>
                                    <p className="created">{new Date(comment.updatedAt).toLocaleString().split(",")[0]}</p>
                                    <p className="likes"><span className='underlined'>Likes</span>: {allLikes.filter(like => (like.commentId === comment._id)).length}</p>
                                </div>
                                <p className="comment">{comment.text}</p>
                            </div>
                            {comment.userName === loggedIn.userName ?
                                <div className='ud-buttons'>
                                    <button onClick={() => updateComment({ text: comment.text, id: comment._id })} disabled={disabled}>Edit</button>
                                    <button onClick={() => setCommentToDelete(comment._id)} disabled={disabled}>Delete</button>
                                </div>
                                :
                                <>
                                    {allLikes.filter(like => like.commentId === comment._id && like.userName === loggedIn.userName).length
                                        ?
                                        <button className="likes-button" onClick={() => changeLikeComment("delete", currentCommentLikeId(comment._id))}><img disabled={disabled} className="heart" src={like} alt="like" /></button>
                                        :
                                        <button className="likes-button" onClick={() => changeLikeComment("add", comment._id)}><img disabled={disabled} className="heart" src={dislike} alt="dislike" /></button>
                                    }
                                </>
                            }
                        </li>
                    ))}
                </ul>
            </div>

            <CommentModal
                commentModalHidden={commentModalHidden}
                setCommentModalHidden={setCommentModalHidden}
                setBlogId={setBlogId} // SEEMS LIKE I WON'T NEED THE SETBLOGID FUNCTION SINCE IT'S NOT HELPING TO RE-RENDER/REDIRECT-TO THE "CURRENTBLOG" PAGE AFTER A COMMENT IS CREATED OR UPDATED...
                loggedIn={loggedIn}
                currentBlog={currentBlog}
                commentToUpdate={commentToUpdate}
                navigate={navigate} // SEEMS LIKE I WON'T NEED THE NAVIGATE FUNCTION SINCE IT'S NOT HELPING TO RE-RENDER/REDIRECT-TO THE "CURRENTBLOG" PAGE AFTER A COMMENT IS CREATED OR UPDATED...
            />

            <BlogModal
                loggedIn={loggedIn}
                blogModalHidden={blogModalHidden}
                currentBlog={currentBlog}
                setBlogModalHidden={setBlogModalHidden}
                navigate={navigate}
            />
        </section>
    );
};