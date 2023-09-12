import { useState, useEffect } from 'react';
import axios from 'axios';


export default function CommentModal({ commentModalHidden, setCommentModalHidden, currentBlog, loggedIn, commentToUpdate }) {

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
    // console.log("COMMENTMODAL'S COMMENTTEXT VALUE: ", commentText);

    const submitForm = () => {
            setFormData(prev => ({
                ...prev,
                text: commentText
            }));
        // console.log("COMMENTMODAL'S SUBMITFORM'S SETFORMDATA TEXT VALUE: ", commentText);
    };

    useEffect(() => {
        if (commentToUpdate.text) {
            setCommentText(commentToUpdate.text);

            if (formData.text) {
                const updateComment = async () => {
                    const URL = `http://localhost:5011/api/blogs/comments/${commentToUpdate.id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`
                        },
                    };
                    try {
                        const response = await axios.put(URL, formData, config);
                        console.log("COMMENTMODAL'S USEEFFECT POST ATTEMPT RESPONSE: ", response);
                    } catch (err) {
                        console.log("FETCH ERROR: ", err)
                    };
                };
                updateComment();
            };

        } else {
            const createComment = async () => {
                const URL = "http://localhost:5011/api/blogs/comments";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.post(URL, formData, config);
                } catch (err) {
                    console.log("FETCH ERROR: ", err)
                };
            };
            createComment();
        };

    }, [formData, loggedIn.token, currentBlog, commentToUpdate]);

    // console.log("TEXT TO BE UPDATED: ", text, "CURRENT COMMENTTEXT: ", commentText);

    return (
        <form className={commentModalHidden ? "hidden" : "modal"}>
            <textarea className="modal-comment" value={commentText} onChange={handleTextChange} placeholder="Leave a comment..." />
            <button className="submit-text" onClick={submitForm}>Submit</button>
            <button className="cancel" onClick={cancelComment}>Cancel</button>
        </form>
    );
};