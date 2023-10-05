import { useState, useEffect } from 'react';
import axios from 'axios';
import CommentModal from '../components/CommentModal';
import BlogModal from '../components/BlogModal';
import like from "../assets/images/icons/filled_red_heart.png";
import dislike from "../assets/images/icons/heart_shell.png";


export default function CurrentBlog({ currentBlog, setBlogId, blogComments, loggedIn, blogModalHidden, setBlogModalHidden, allLikes, setChangeLike, blogToUpdate, updateBlog, handleBlogTitleChange, handleBlogTextChange, cancelBlog, submitBlogForm, blogFormData, navigate }) {

    const [commentModalHidden, setCommentModalHidden] = useState(true);
    const [commentToDelete, setCommentToDelete] = useState("");
    const [blogToDelete, setBlogToDelete] = useState("");
    const [commentToUpdate, setCommentToUpdate] = useState("");

    const updateCommentFill = useEffect;
    const [commentFormData, setCommentFormData] = useState({
        text: "",
        userName: loggedIn.userName,
        blogId: currentBlog._id,
        update: false,
        ready: false
    });

    const handleCommentTextChange = ({ target }) => {
        setCommentFormData(prev => ({
            ...prev,
            text: target.value
        }));
    };

    const submitCommentForm = () => {
        setCommentFormData(prev => ({
            ...prev,
            ready: true
        }));
        setTimeout(setBlogId, 195, "");
        setTimeout(setBlogId, 200, currentBlog._id);
    };
    // console.log("COMMENTMODAL'S CURRENTBLOG INFO: ", currentBlog);

    updateCommentFill(() => {
        if (commentToUpdate.text) {
            setCommentFormData(prev => ({
                ...prev,
                text: commentToUpdate.text,
                update: true
            }));
        };
    }, [commentToUpdate]);

    const startComment = () => {
        setCommentModalHidden(false);
    };

    const updateComment = (commentInfo) => {
        setCommentToUpdate(commentInfo);
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

    const deleteComment = (comment, blog) => {
        setCommentToDelete(comment);
        setTimeout(setBlogId, 195, "");
        setTimeout(setBlogId, 200, blog);
    };

    const deleteBlog = (blog) => {
        setBlogToDelete(blog);
        setTimeout(setBlogId, 100, "");
    };

    useEffect(() => {
        if (!currentBlog) {
            console.log("10.99");
            navigate("/");
          };
        if (commentToDelete) {
            console.log("11");
            const commentDeletion = async () => {
                const URL = "https://devsquaredbe.onrender.com/api/blogs/comments/";
                // const URL = "http://localhost:5011/api/blogs/comments/";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.delete(URL + commentToDelete, config);
                } catch (err) {
                    console.log(err);
                };
            };
            commentDeletion();
        };

        if (blogToDelete) {
            console.log("12");
            const blogDeletion = async () => {
                const URL = "https://devsquaredbe.onrender.com/api/blogs/";
                // const URL = "http://localhost:5011/api/blogs/";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.delete(URL + blogToDelete, config);
                } catch (err) {
                    console.log(err);
                };
            };
            blogDeletion();
        };

        if (commentFormData.update && commentFormData.ready) {
                console.log("13");
                const updateComment = async () => {
                    const URL = `https://devsquaredbe.onrender.com/api/blogs/comments/${commentToUpdate.id}`;
                    // const URL = `http://localhost:5011/api/blogs/comments/${commentToUpdate.id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`,
                        },
                    };
                    const commentData = {
                        text: commentFormData.text,
                        userName: commentFormData.userName,
                        blogId: commentFormData.blogId,
                    };
                    // console.log("------updateComment INFO------");
                    // console.log("commentData: ", commentData);
                    // console.log("commentToUpdate.id: ", commentToUpdate.id);
                    // console.log("commentData.blogId: ", commentData.blogId);
                    // console.log("commentData.text: ", commentData.text);
                    // console.log("commentData.userName: ", commentData.userName);
                    // console.log("loggedIn.token: ", loggedIn.token);
                    // console.log("commentData.ready: ", commentFormData.ready);
                    // console.log("commentData.update: ", commentFormData.update);
                    try {
                        await axios.put(URL, commentData, config);
                    } catch (err) {
                        console.log(err);
                    };
                };
                updateComment();

        } else if (!commentFormData.update && commentFormData.ready) {
            console.log("14");
            const createComment = async () => {
                const URL = "https://devsquaredbe.onrender.com/api/blogs/comments/";
                // const URL = "http://localhost:5011/api/blogs/comments";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                const commentData = {
                    text: commentFormData.text,
                    userName: commentFormData.userName,
                    blogId: commentFormData.blogId,
                };
                // console.log("------createComment INFO------");
                // console.log("commentData: ", commentData);
                // console.log("commentData.blogId: ", commentData.blogId);
                // console.log("commentData.text: ", commentData.text);
                // console.log("commentData.userName: ", commentData.userName);
                // console.log("loggedIn.token: ", loggedIn.token);
                // console.log("commentData.ready: ", commentFormData.ready);
                // console.log("commentData.update: ", commentFormData.update);
                try {
                    await axios.post(URL, commentData, config);
                } catch (err) {
                    console.log(err);
                };
            };
            createComment();
        };

    }, [commentToDelete, blogToDelete, commentFormData.ready]);

    const disabled = !blogModalHidden || !commentModalHidden;
    console.log("CURRENTBLOG VALUE: ", currentBlog);

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
                        <button onClick={() => deleteBlog(currentBlog._id)} disabled={disabled}>Delete</button>
                        <button onClick={() => updateBlog({ title: currentBlog.title, text: currentBlog.text, id: currentBlog._id })} disabled={disabled}>Edit</button>
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
                                    <button onClick={() => deleteComment(comment._id, currentBlog._id)} disabled={disabled}>Delete</button>
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
                loggedIn={loggedIn}
                currentBlog={currentBlog}
                commentToUpdate={commentToUpdate}
                commentFormData={commentFormData}
                submitCommentForm={submitCommentForm}
                handleCommentTextChange={handleCommentTextChange}
                setBlogId={setBlogId}
            />

            <BlogModal
                loggedIn={loggedIn}
                blogModalHidden={blogModalHidden}
                currentBlog={currentBlog}
                setBlogModalHidden={setBlogModalHidden}
                blogToUpdate={blogToUpdate}
                setBlogId={setBlogId}
                handleBlogTitleChange={handleBlogTitleChange}
                cancelBlog={cancelBlog}
                submitBlogForm={submitBlogForm}
                blogFormData={blogFormData}
                handleBlogTextChange={handleBlogTextChange}
            />
        </section>
    );
};