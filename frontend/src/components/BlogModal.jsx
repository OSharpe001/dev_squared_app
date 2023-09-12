import { useState, useEffect } from 'react';


export default function BlogModal({ blogModalHidden, setBlogModalHidden, loggedIn }) {

    const [formData, setFormData] = useState({
        blogTitle: "",
        blogText: "",
        userName: loggedIn.userName
    });
    // const [blogText, setBlogText] = useState("");

    const handleChange = ({ target }) => {
        setFormData(prev => ({
            ...prev,
            [target.name]: target.value
        }));
    };

    const cancelBlog = () => {
        setFormData(prev => ({
            ...prev,
            blogTitle: "",
            blogText: ""
        }));
        setBlogModalHidden(true);
    };

  return (
    <form className={blogModalHidden? "hidden": "modal"}>
        <input type="text" className="modal-title" onChange={handleChange}value={formData.blogTitle} placeholder="leave a comment"/>
        <input type="text" className="modal-text" onChange={handleChange}value={formData.blogText} placeholder="leave a comment"/>
        <button className="submit-text" >submit</button>
        <button className="cancel" onClick={cancelBlog}>Cancel</button>
    </form>
  );
};