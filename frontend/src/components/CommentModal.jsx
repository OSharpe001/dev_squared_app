import { useState, useEffect } from 'react';
import axios from 'axios';


export default function CommentModal({ commentModalHidden, setCommentModalHidden, currentBlog, loggedIn, commentToUpdate, navigate }) {

    const [commentText, setCommentText] = useState("");
    const [formData, setFormData] = useState({
        text: "",
        userName: loggedIn.userName,
        blogId: currentBlog._id
    });

    const cancelComment = () => {
        setCommentText("");
        setCommentModalHidden(true);
    };

    const handleTextChange = ({ target }) => {
        setCommentText(target.value);
    };

    const submitForm = () => {
            setFormData(prev => ({
                ...prev,
                text: commentText
            }));
    };

    useEffect(() => {
        if (commentToUpdate.text) {
            setCommentText(commentToUpdate.text);

            if (formData.text) {
                const updateComment = async () => {
                    const URL = `https://devsquaredbe.onrender.com/api/blogs/comments/${commentToUpdate.id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`
                        },
                    };
                    try {
                        await axios.put(URL, formData, config);
                    } catch (err) {
                        console.log("UPDATE FETCH ERROR: ", err)
                    };
                };
                updateComment();
                navigate("/");
            };

        } else if (formData.text) {
            const createComment = async () => {
                const URL = "https://devsquaredbe.onrender.com/api/blogs/comments";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.post(URL, formData, config);
                } catch (err) {
                    console.log("FETCH ERROR: ", err);
                };
            };
            createComment();
        };
    }, [formData, loggedIn.token, currentBlog, commentToUpdate, navigate]);

    return (
        <form className={commentModalHidden ? "hidden" : "comment-modal modal"}>
            <textarea className="modal-comment" autoFocus={!commentModalHidden} value={commentText} onChange={handleTextChange} placeholder="Leave a comment..." />
            <button className="submit-text" onClick={submitForm}>Submit</button>
            <button className="cancel" onClick={cancelComment}>Cancel</button>
        </form>
    );
};