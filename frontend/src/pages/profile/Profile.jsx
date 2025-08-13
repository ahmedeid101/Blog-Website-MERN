// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from "react";
// import { getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCalls";
// import UpdateProfileModal from "./UpdateProfileModal";
// import PostList from "../../components/posts/PostList";
// import { toast } from "react-toastify";
// import swal from "sweetalert";
// import "./profile.css";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const { id } = useParams(); // ✅ This pulls :id from /profile/:id

//   const { data: profile } = useSelector((state) => state.profile);
//   const { user } = useSelector((state) => state.auth);

//   const [updateProfile, setUpdateProfile] = useState(false);
//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     if (id) { // ✅ Load profile by the id in the URL
//       dispatch(getUserProfile(id));
//     }
//     window.scrollTo(0, 0);
//   }, [id, dispatch]);

//   const formSubmitHandler = (e) => {
//     e.preventDefault();
//     if (!file) return toast.warning("No file selected!");
//     const formData = new FormData();
//     formData.append("image", file);
//     dispatch(uploadProfilePhoto(formData));
//   };

//   const deleteProfileHandler = () => {
//     swal({
//       title: "Are you sure?",
//       text: "Once deleted, you will not be able to recover your account!",
//       icon: "warning",
//       buttons: true,
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         swal("Profile has been deleted!", { icon: "success" });
//       } else {
//         swal("Something went wrong!");
//       }
//     });
//   };

//   return (
//     <section className="profile">
//       <div className="profile-header">
//         <div className="profile-image-wrapper">
//           <img
//             src={file ? URL.createObjectURL(file) : profile?.profilePhoto?.url || "/default-avatar.png"}
//             alt=""
//             className="profile-image"
//           />
//           <form onSubmit={formSubmitHandler}>
//             <abbr title="choose profile photo">
//               <label
//                 htmlFor="file"
//                 className="bi bi-camera-fill upload-profile-photo-icon"
//               ></label>
//             </abbr>
//             <input
//               style={{ display: "none" }}
//               type="file"
//               name="file"
//               id="file"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//             <button type="submit" className="upload-profile-photo-btn">
//               Upload
//             </button>
//           </form>
//         </div>
//         <h1 className="profile-username">{profile?.username}</h1>
//         <p className="profile-bio">{profile?.bio}</p>
//         <div className="user-date-joined">
//           <strong>Date Joined: </strong>
//           <span>{profile?.createdAt ? new Date(profile.createdAt).toDateString() : "N/A"}</span>
//         </div>
//         {user?._id === id && (
//           <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
//             <i className="bi bi-person-fill"></i>
//             Update Profile
//           </button>
//         )}
//       </div>
//       <div className="profile-posts-list">
//         <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
//         <PostList posts={profile?.posts || []} />
//       </div>
//       {user?._id === id && (
//         <button onClick={deleteProfileHandler} className="delete-profile-btn">
//           Delete Your Profile
//         </button>
//       )}
//       {updateProfile && <UpdateProfileModal setUpdateProfile={setUpdateProfile} />}
//     </section>
//   );
// };

// export default Profile;







import "./profile.css";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import { useEffect, useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUserProfile, uploadProfilePhoto } from "../../redux/apiCalls/profileApiCalls";

const Profile = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector((state) => state.profile)
  //const { data: profile } = useSelector((state) => state.profile || { data: {} });

  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);

  const {id} = useParams();
  useEffect(() => {
    if(id){
      dispatch(getUserProfile(id));
    }
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData))
  };

  // Delete Account Handler
  const deleteProfileHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Profile has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Something went wrong!");
      }
    });
  };

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            className="profile-image"
          />
          <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit" className="upload-profile-photo-btn">
              Upload
            </button>
          </form>
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
          {profile?.bio}
        </p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        <button onClick={() => setUpdateProfile(true)} className="profile-update-btn">
          <i className="bi bi-person-fill"></i>
          Update Profile
        </button>
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        <PostList posts={posts} />
      </div>
      <button onClick={deleteProfileHandler} className="delete-profile-btn">Delete Your Profile</button>
      {updateProfile && <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile}/>}
    </section>
  );
};

export default Profile;
