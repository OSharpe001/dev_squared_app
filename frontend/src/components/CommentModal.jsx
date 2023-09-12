import { useState, useEffect } from 'react';
import axios from 'axios';


export default function CommentModal({ commentModalHidden, setCommentModalHidden, currentBlog, loggedIn }) {

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
    console.log("COMMENTMODAL'S COMMENTTEXT VALUE: ", commentText);

    const submitForm = () => {
        setFormData(prev => ({
            ...prev,
            text: commentText
        }));
        console.log("COMMENTMODAL'S SUBMITFORM'S SETFORMDATA TEXT VALUE: ", commentText);
    };

    useEffect(() => {
        const URL = "http://localhost:5011/api/blogs/comments";

        const createComment = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${loggedIn.token}`
                },
            };
            try {
                const response = await axios.post(URL, formData, config);
                console.log("COMMENTMODAL'S USEEFFECT POST ATTEMPT RESPONSE: ", response);
            } catch (err) {
                console.log("FETCH ERROR: ", err)
            };
        };
        createComment();
    }, [formData, loggedIn.token]);

  return (
    <form className={commentModalHidden? "hidden": "modal"}>
        <textarea className="modal-comment" value={commentText} onChange={handleTextChange} placeholder="Leave a comment..."/>
        <button className="submit-text" onClick={submitForm}>Submit</button>
        <button className="cancel" onClick={cancelComment}>Cancel</button>
    </form>
  );
};