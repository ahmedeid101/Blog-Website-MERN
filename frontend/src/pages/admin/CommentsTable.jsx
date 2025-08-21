import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { deleteComment, fetchAllComments } from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
      const dispatch = useDispatch();
      const { comments } = useSelector(state => state.comment);
  
      useEffect(() => {
       dispatch(fetchAllComments());
      }, [dispatch]);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId))
      }
    });
  };

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.user?.profilePhoto.url || "/images/user-avatar.png"}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.user.username}</span>
                  </div>
                </td>
                <td>
                  <b>{item.text}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(item._id)}>
                      Delete Comment
                    </button>
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

export default CommentsTable;
