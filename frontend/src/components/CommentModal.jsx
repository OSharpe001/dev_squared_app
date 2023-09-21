import { useState, useEffect } from 'react';
import axios from 'axios';


export default function CommentModal({ commentModalHidden, setCommentModalHidden, currentBlog, setBlogId, loggedIn, commentToUpdate, navigate }) { // SEEMS LIKE I WON'T NEED THE SETBLOGID FUNCTION SINCE IT'S NOT HELPING TO RE-RENDER/REDIRECT-TO THE "CURRENTBLOG" PAGE AFTER A COMMENT IS CREATED OR UPDATED...

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
            // setBlogId(formData.blogId); // RESETTING THE "CURRENT BLOG ID" BEFORE THE COMMENT UPDATE DIDN'T WORK (TO MAKE THE PAGE REDIRECT BACK TO THE CURRENT BLOG)

            if (formData.text) {
                const updateComment = async () => {
                    // const URL = `https://devsquaredbe.onrender.com/api/blogs/comments/${commentToUpdate.id}`;
                    const URL = `http://localhost:5011/api/blogs/comments/${commentToUpdate.id}`;
                    const config = {
                        headers: {
                            Authorization: `Bearer ${loggedIn.token}`
                        },
                    };
                    try {
                        await axios.put(URL, formData, config);
                        // setBlogId(formData.blogId); // RESETTING THE "CURRENT BLOG ID" DURING THE COMMENT UPDATE DIDN'T WORK (TO MAKE THE PAGE REDIRECT BACK TO THE CURRENT BLOG)
                        // navigate("/blog"); // TRYING TO FORCE A REDIRECTION BACK TO THE CURRENT BLOG ONLY GETS REDIRECTED BACK SINCE DURING THE RE-RENDERS, THE BLOG.ID IS LOST (AUTO-HOME-RERENDER FUNCTION ON APP.JSX)
                    } catch (err) {
                        console.log("UPDATE FETCH ERROR: ", err);
                    };
                };
                updateComment();
                // setBlogId(formData.blogId); // setBlogId(formData.blogId); // RESETTING THE "CURRENT BLOG ID" AFTER THE COMMENT UPDATE DIDN'T WORK (TO MAKE THE PAGE REDIRECT BACK TO THE CURRENT BLOG)
                // navigate("/blog"); // TRYING TO FORCE A REDIRECTION BACK TO THE CURRENT BLOG ONLY GETS REDIRECTED BACK SINCE DURING THE RE-RENDERS, THE BLOG.ID IS LOST (AUTO-HOME-RERENDER FUNCTION ON APP.JSX)
            };

        } else if (formData.text) {
            // setBlogId(formData.blogId);  // RESETTING THE "CURRENT BLOG ID" BEFORE THE COMMENT CREATE DIDN'T WORK (TO MAKE THE PAGE REDIRECT BACK TO THE CURRENT BLOG)
            const createComment = async () => {
                // const URL = "https://devsquaredbe.onrender.com/api/blogs/comments";
                const URL = "http://localhost:5011/api/blogs/comments";
                const config = {
                    headers: {
                        Authorization: `Bearer ${loggedIn.token}`
                    },
                };
                try {
                    await axios.post(URL, formData, config);
                    // setBlogId(formData.blogId); // RESETTING THE "CURRENT BLOG ID" DURING THE COMMENT CREATE DIDN'T WORK (TO MAKE THE PAGE REDIRECT BACK TO THE CURRENT BLOG)
                    // navigate("/blog"); // TRYING TO FORCE A REDIRECTION BACK TO THE CURRENT BLOG ONLY GETS REDIRECTED BACK SINCE DURING THE RE-RENDERS, THE BLOG.ID IS LOST (AUTO-HOME-RERENDER FUNCTION ON APP.JSX)
                } catch (err) {
                    console.log("FETCH ERROR: ", err);
                };
            };
            createComment();
            // setBlogId(formData.blogId); // RESETTING THE "CURRENT BLOG ID" AFTER THE COMMENT CREATE DIDN'T WORK (TO MAKE THE PAGE REDIRECT BACK TO THE CURRENT BLOG)
            // navigate("/blog"); // TRYING TO FORCE A REDIRECTION BACK TO THE CURRENT BLOG ONLY GETS REDIRECTED BACK SINCE DURING THE RE-RENDERS, THE BLOG.ID IS LOST (AUTO-HOME-RERENDER FUNCTION ON APP.JSX)
        };
        console.log("COMMENTMODAL USEEFFECT'S FORMDATA.BLOGID: ", formData.blogId);
        // setBlogId(formData.blogId); // RESETTING THE "CURRENT BLOG ID" AFTER THE COMMENT CREATE/DELETE FUNCTIONS DIDN'T WORK (TO MAKE THE PAGE REDIRECT BACK TO THE CURRENT BLOG)
        // navigate("/blog"); // TRYING TO FORCE A REDIRECTION BACK TO THE CURRENT BLOG ONLY GETS REDIRECTED BACK SINCE DURING THE RE-RENDERS, THE BLOG.ID IS LOST (AUTO-HOME-RERENDER FUNCTION ON APP.JSX)

    }, [formData, commentToUpdate/*, loggedIn.token, currentBlog, navigate,, setBlogId*/]); // CURRENTLY DON'T NEED THE COMMENTED OUT  PARAMETERS TO OPERATE THIS USEEFFECT...

    return (
        <form className={commentModalHidden ? "hidden" : "comment-modal modal"}>
            <textarea className="modal-comment" autoFocus={!commentModalHidden} value={commentText} onChange={handleTextChange} placeholder="Leave a comment..." />
            <button className="submit-text" onClick={submitForm}>Submit</button>
            <button className="cancel" onClick={cancelComment}>Cancel</button>
        </form>
    );
};