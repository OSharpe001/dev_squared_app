import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


export default function CommentModal({ commentModalHidden, setCommentModalHidden, currentBlog, loggedIn, commentToUpdate }) {

    const autoFocus = useEffect;
    const commentInput = useRef();
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

    autoFocus(()=> {
        if (!commentModalHidden) {
            commentInput.current.focus();
        };
      }, [commentModalHidden]);

    useEffect(() => {
        if (commentToUpdate.text) {
            console.log("13");
            // REFILLS COMMENT MODAL WITH THE PREVIOUS TEXT OF THE COMMENT THAT NEEDS UPDATING
            setCommentText(commentToUpdate.text);
            if (formData.text) {
                const updateComment = async () => {
                    const URL = `https://devsquaredbe.onrender.com/api/blogs/comments/${commentToUpdate.id}`;
                    // const URL = `http://localhost:5011/api/blogs/comments/${commentToUpdate.id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`,
                            "Content-Type": "application/json",
                        },
                    };
                    try {
                        await axios.put(URL, formData, config);
                    } catch (err) {
                        console.log(err);
                    };
                };
                updateComment();
            };

        } else if (formData.text) {
            console.log("14");
            const createComment = async () => {
                const URL = "https://devsquaredbe.onrender.com/api/blogs/comments/";
                // const URL = "http://localhost:5011/api/blogs/comments";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`,
                        "Content-Type": "application/json",
                    },
                };
                try {
                    await axios.post(URL, formData, config);
                } catch (err) {
                    console.log(err);
                };
            };
            createComment();
        };

    }, [formData, commentToUpdate, loggedIn.token]);

    return (
        <form className={commentModalHidden ? "hidden" : "comment-modal modal"}>
            <textarea ref={commentInput} className="modal-comment" autoFocus={!commentModalHidden} value={commentText} onChange={handleTextChange} placeholder="Leave a comment..." />
            <button className="submit-text" onClick={submitForm}>Submit</button>
            <button className="cancel" onClick={cancelComment}>Cancel</button>
        </form>
    );
};