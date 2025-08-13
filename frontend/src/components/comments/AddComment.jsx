import { useState } from "react";
import { toast } from "react-toastify";
import "./add-comment.css";

const AddComment = () => {

 const [text, setText] = useState("");

  // Form Submit Handler
  const FormSubmitHandler = (e) =>{
    e.preventDefault();
    if(text.trim() === "") return toast.error('please write something');
    console.log({text});
    setText("");

  }

  return (
    <form onSubmit={FormSubmitHandler} className="add-comment">
      <input 
        type="text"
        placeholder="add a comment" 
        className="add-comment-input"
        value={text}
        onChange={(e) => setText(e.target.value) }
      />
      <button type="submit" className="add-comment-btn">Comment</button>

    </form>
  );
};

export default AddComment;
