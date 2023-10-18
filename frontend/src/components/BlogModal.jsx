import { useEffect, useRef } from 'react';


export default function BlogModal({ blogModalHidden, blogFormData, handleBlogTitleChange, handleBlogTextChange, cancelBlog, submitBlogForm }) {

    const autoFocus = useEffect;
    const blogTitleInput = useRef();

    autoFocus(() => {
        if (!blogModalHidden) {
            blogTitleInput.current.focus();
        };
    }, [blogModalHidden]);

    return (
        <form className={blogModalHidden ? "hidden" : "blog-modal modal"}>
            <input ref={blogTitleInput} type="text" className="modal-title" onChange={handleBlogTitleChange} value={blogFormData.title} placeholder="Title" />
            <textarea className="modal-blog" onChange={handleBlogTextChange} value={blogFormData.text} placeholder="What are your thoughts" />
            <div className="modal-buttons">
                <button className="submit-text" onClick={submitBlogForm}>submit</button>
                <button className="cancel" onClick={cancelBlog}>Cancel</button>
            </div>
        </form>
    );
};