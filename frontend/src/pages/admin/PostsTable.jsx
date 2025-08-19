import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, getAllPosts } from "../../redux/apiCalls/postApiCalls";

const PostsTable = () => {
    const dispatch = useDispatch();
    const { posts  } = useSelector(state => state.post);
  
      useEffect(() => {
       dispatch(getAllPosts());
      }, [dispatch]);

   // Delete Post Handler
   const deletePostHandler = (postId) => {
  Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId))
=======
import { posts } from "../../dummyData";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const PostsTable = () => {
   // Delete Post Handler
   const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Post has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
      }
    });
  };

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Posts</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
<<<<<<< HEAD
                      src={item.uer?.profilePhoto?.url || "/images/user-avatar.png"}
=======
                      src="/images/user-avatar.png"
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.user.username}</span>
                  </div>
                </td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>View Post</Link>
                    </button>
<<<<<<< HEAD
                    <button onClick={() => deletePostHandler(item._id)}>Delete Post</button>
=======
                    <button onClick={deletePostHandler}>Delete Post</button>
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsTable;
