import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


export default function CommentModal({ commentModalHidden, setCommentModalHidden, currentBlog, loggedIn, commentToUpdate }) {

    const autoFocus = useEffect;
    const updateCommentFill = useEffect;
    const commentInput = useRef();
    const [commentText, setCommentText] = useState("");
    const [commentFormData, setCommentFormData] = useState({
        text: "",
        userName: loggedIn.userName,
        blogId: currentBlog._id,
        update: false,
        ready: false
    });

    const cancelComment = () => {
        setCommentText("");
        setCommentModalHidden(true);
    };

    const handleTextChange = ({ target }) => {
        setCommentText(target.value);
    };

    const submitForm = () => {
        setCommentFormData(prev => ({
            ...prev,
            text: commentText,
            ready: true,
        }));
    };
    // ******************
    updateCommentFill(() => {
        if (commentToUpdate.text) {
            // console.log("13");
            // REFILLS COMMENT MODAL WITH THE PREVIOUS TEXT OF THE COMMENT THAT NEEDS UPDATING
            setCommentText(commentToUpdate.text);
            setCommentFormData(prev => ({
                ...prev,
                update: true,
            }));
        };
    }, [commentToUpdate]);
    // ******************

    autoFocus(()=> {
        if (!commentModalHidden) {
            commentInput.current.focus();
        };
      }, [commentModalHidden]);

    useEffect(() => {
        if (commentFormData.update && commentFormData.ready) {
                console.log("13");
                const updateComment = async () => {
                    const URL = `https://devsquaredbe.onrender.com/api/blogs/comments/${commentToUpdate.id}`;
                    // const URL = `http://localhost:5011/api/blogs/comments/${commentToUpdate.id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`,
                            "Content-Type": "application/json, multipart/form-data",
                            Accept: "application/json, text/plain, /"
                        },
                    };
                    const commentData = {
                        text: commentFormData.text,
                        userName: commentFormData.userName,
                        blogId: commentFormData.blogId,
                    };
                    console.log("------updateComment INFO------");
                    console.log("commentData: ", commentData);
                    console.log("commentToUpdate.id: ", commentToUpdate.id);
                    console.log("commentData.blogId: ", commentData.blogId);
                    console.log("commentData.text: ", commentData.text);
                    console.log("commentData.userName: ", commentData.userName);
                    console.log("loggedIn.token: ", loggedIn.token);
                    console.log("commentData.ready: ", commentFormData.ready);
                    console.log("commentData.update: ", commentFormData.update);
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
                        Authorization: `Bearer ${loggedIn.token}`,
                        "Content-Type": "application/json, multipart/form-data, application/x-www-form-urlencoded",
                        // Accept: "application/json, text/plain, /",
                        Accept: "*/*",
                    },
                };
                const commentData = {
                    text: commentFormData.text,
                    userName: commentFormData.userName,
                    blogId: commentFormData.blogId,
                };
                console.log("------createComment INFO------");
                console.log("commentData: ", commentData);
                console.log("commentData.blogId: ", commentData.blogId);
                console.log("commentData.text: ", commentData.text);
                console.log("commentData.userName: ", commentData.userName);
                console.log("loggedIn.token: ", loggedIn.token);
                console.log("commentData.ready: ", commentFormData.ready);
                console.log("commentData.update: ", commentFormData.update);
                try {
                    await axios.post(URL, commentData, config);
                } catch (err) {
                    console.log(err);
                };
                // setCommentFormData({
                //     text: "",
                //     userName: loggedIn.userName,
                //     blogId: currentBlog._id,
                //     update: false,
                //     ready: false
                // });
            };
            createComment();
        };

    }, [commentFormData/*, commentToUpdate, loggedIn.token*/]);

    console.log("COMMENTFORMDATA: ", commentFormData);

    return (
        <form className={commentModalHidden ? "hidden" : "comment-modal modal"}>
            <textarea ref={commentInput} className="modal-comment" autoFocus={!commentModalHidden} value={commentText} onChange={handleTextChange} placeholder="Leave a comment..." />
            <button className="submit-text" onClick={submitForm}>Submit</button>
            <button className="cancel" onClick={cancelComment}>Cancel</button>
        </form>
    );
};