import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./post-details.css";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import Swal from "sweetalert2";
import UpdatePostModel from "./UpdatePostModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, toggleLike } from "../../redux/apiCalls/postApiCalls";
import {
  updatePostImage,
  deletePost,
} from "./../../redux/apiCalls/postApiCalls";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    dispatch(fetchPost(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  // Update Image Submit Handler
  const UpdateImageSubmitHandler = (event) => {
    event.preventDefault();
    if (!file) return toast.warning("there is no file uploaded!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const navigate = useNavigate();
  // Delete Post Handler
  const DeletePostHanddler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  // toogle like color button
  const isLiked = !!post?.likes?.some(
    (l) => (typeof l === "string" ? l : l?._id) === user?._id
  );

  return (
    <section className="post-details">
      <div className="post-details-image">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="post-details-img"
        />
        {user?._id === post?.user?._id && (
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
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user?.profilePhoto.url}
          alt=""
          className="post-details-user-img"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user?._id}`}>
              {post?.user?.username}
            </Link>
          </strong>
          <span>{new Date(post?.createdAt).toString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description } 
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
        explicabo eveniet tenetur. Illo quidem enim a esse, magni libero. Sint
        delectus laboriosam adipisci magnam, dicta iure sed hic at est.
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLike(post?._id))}
              className={`bi ${
                isLiked ? "bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"
              } like-btn ${isLiked ? "liked" : ""}`}
              aria-label={isLiked ? "Unlike" : "Like"}
              role="button"
            ></i>
          )}
          <small>{post?.likes.length} Likes</small>
        </div>

        {user?._id === post?.user?._id && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square"
            ></i>
            <i onClick={DeletePostHanddler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="unlogin-comment">
          to write comment you should login first
        </p>
      )}

      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModel setUpdatePost={setUpdatePost} post={post} />
      )}
    </section>
  );
};

export default PostDetails;
