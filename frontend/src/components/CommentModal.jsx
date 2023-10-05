import { useEffect, useRef } from 'react';


export default function CommentModal({ commentModalHidden, setCommentModalHidden, commentFormData, submitCommentForm, handleCommentTextChange }) {

    const autoFocus = useEffect;
    const commentInput = useRef();

    const cancelComment = () => {
        setCommentModalHidden(true);
    };

    autoFocus(()=> {
        if (!commentModalHidden) {
            commentInput.current.focus();
        };
      }, [commentModalHidden]);

    // console.log("COMMENTFORMDATA: ", commentFormData);

    return (
        <form className={commentModalHidden ? "hidden" : "comment-modal modal"}>
            <textarea ref={commentInput} className="modal-comment" autoFocus={!commentModalHidden} value={commentFormData.text} onChange={handleCommentTextChange} placeholder="Leave a comment..." />
            <div className="modal-buttons">
                <button className="submit-text" onClick={submitCommentForm}>Submit</button>
                <button className="cancel" onClick={cancelComment}>Cancel</button>
            </div>
        </form>
    );
};