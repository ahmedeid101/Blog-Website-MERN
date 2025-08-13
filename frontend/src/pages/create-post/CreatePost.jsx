import { useState } from "react";
import "./create-post.css";
import {toast} from 'react-toastify'

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  //form submit handller
  const formSubmitHundller = (event) =>{
    event.preventDefault();

    if(title.trim() === "") return toast.error('title is required');
    if(category.trim() === "") return toast.error('category is required');
    if(description.trim() === "") return toast.error('description is required');
    if(!file) return toast.error('post image is required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', file);

    //@TODO Send Form Data To Server
    
    console.log({title, category, description, file});
  }

  return (
    <section className="create-post">
      <h1 className="create-post-title">Create New Post</h1>

      <form onSubmit={formSubmitHundller} className="create-post-form">
        <input
          type="text"
          placeholder="Post Title"
          className="create-post-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <select 
        className="create-post-input"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        >
          <option disabled value="">
            {" "}
            Select A Category{" "}
          </option>
          <option value="music">Music</option>
          <option value="coffee">Coffee</option>
        </select>

        <textarea
          rows="5"
          placeholder="Post Description"
          className="create-post-textarea"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(event) => setFile(event.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          Create
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
