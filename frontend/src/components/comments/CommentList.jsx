import { useState } from "react";
import "./comment-list.css";
import UpdateCommentModel from "./UpdateCommentModel";
import Swal from "sweetalert2";

const CommentList = () => {
  const [updateComment, setUpdateComment] = useState(false);

  // Delete Comment Handler
  const deleteCommentHandler = () => {
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
          text: "Your comment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">2 Comments</h4>
      {[1,2].map(comment => (
        <div key={comment} className="comment-items">
          <div className="comment-item-info">
            <div className="comment-item-username">
              Ahmed Eid
            </div>
            <div className="comment-item-time">
              3 hours ago
            </div>
          </div>
          <p className="comment-item-text">That's Amazing Post</p>
          <div className="comment-item-icon-wrapper">
            <i onClick={() => setUpdateComment(true)} className="bi bi-pencil-square"></i>
            <i onClick={deleteCommentHandler} className="bi bi-trash-fill"></i>
          </div>
        </div>
      ))}
      {updateComment && <UpdateCommentModel setUpdateComment={setUpdateComment}/>}
    </div>
  );
};

export default CommentList;
