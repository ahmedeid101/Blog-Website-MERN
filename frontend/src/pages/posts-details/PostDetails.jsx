import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { posts } from "../../dummyData";
import "./post-details.css";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import Swal from "sweetalert2";
import UpdatePostModel from "./UpdatePostModel";

const PostDetails = () => {
  const { id } = useParams();
  const post = posts.find((p) => p._id === parseInt(id));
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update Image Submit Handler
  const UpdateImageSubmitHandler = (event) => {
    event.preventDefault();
    if (!file) return toast.warning("there is no file uploaded!");

    console.log("file uploaded successfully");
  };

  // Delete Post Handler
  const DeletePostHanddler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Post has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="post-details">
      <div className="post-details-image">
        <img
          src={file ? URL.createObjectURL(file) : post.image}
          alt=""
          className="post-details-img"
        />
        <form action="" className="update-post-img-form">
          <label htmlFor="file" className="update-post-img">
            <i className="bi bi-image-fill"></i>
            Select New Image
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            id="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
          <button onClick={UpdateImageSubmitHandler} type="submit">
            Upload
          </button>
        </form>
      </div>
      <h1 className="post-details-title">{post.title}</h1>
      <div className="post-details-user-info">
        <img src={post.user.image} alt="" className="post-details-user-img" />
        <div className="post-details-user">
          <strong>
            <Link to="/profile/1">{post.user.username}</Link>
          </strong>
          <span>{post.createdAt}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post.description}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
        explicabo eveniet tenetur. Illo quidem enim a esse, magni libero. Sint
        delectus laboriosam adipisci magnam, dicta iure sed hic at est.
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          <i className="bi bi-hand-thumbs-up"></i>
          <small>{post.likes.length} Likes</small>
        </div>

        <div>
          <i onClick={() => setUpdatePost(true)} className="bi bi-pencil-square"></i>
          <i onClick={DeletePostHanddler} className="bi bi-trash-fill"></i>
        </div>
      </div>
      <AddComment />
      <CommentList />
      {updatePost && <UpdatePostModel setUpdatePost={setUpdatePost} post={post}/>}
    </section>
  );
};

export default PostDetails;
