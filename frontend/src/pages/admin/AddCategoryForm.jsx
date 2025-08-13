import { useState } from "react";
import { toast } from "react-toastify";

const AddCategoryForm = () => {
  const [title, setTitle] = useState("");

  const formSubmitHandller = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title Is Required");
    console.log({title});
  };

  return (
    <div className="add-category">
      <h6 className="add-category-title">Add New Category</h6>
      <form onSubmit={formSubmitHandller} className="add-category-form">
        <div className="add-category-form-group">
          <label htmlFor="title">Category Title</label>
          <input
            type="text"
            id="text"
            placeholder="Inter Category Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button type="submit" className="add-category-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
