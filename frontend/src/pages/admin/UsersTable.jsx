import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteProfile, getAllUsersProfile } from "../../redux/apiCalls/profileApiCalls";
import { useEffect } from "react";

const UsersTable = () => {
  const dispatch = useDispatch();
      const {  profiles, isProfileDeleted } = useSelector(state => state.profile);
      useEffect(() => {
       dispatch(getAllUsersProfile());
      }, [dispatch, isProfileDeleted]);
  // Delete User Handler
  const deleteUserHandler = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId));
      }
    });
  };

  return (
    <div className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {profiles.map((item, index) =>(
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>
                  <div className="table-image">
                    <img src={item.profilePhoto?.url||"/images/user-avatar.png"} alt="" className="table-user-image" />
                    <span className="table-username">{item.username}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item._id}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(item._id)}>Delete User</button>
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

export default UsersTable;
