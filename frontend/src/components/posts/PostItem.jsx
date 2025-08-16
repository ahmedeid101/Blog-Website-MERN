import { Link } from "react-router-dom";

const PostItem = ({ post, userId, username }) => {
  const profileLink = userId ? `/profile/${userId}` : `/profile/${post?.user?._id}`;
  return (
    <div className="post-item">
      <div className="post-item-image">
        <img src={post?.image.url} alt="" className="post-img" />
      </div>

      <div className="postItem-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link 
              className="post-item-username" 
              to={profileLink} 
            >
              {username ? username : post?.user.username}
            </Link>
          </div>
          <div className="post-item-date">
            {new Date(post.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post?.title}</h4>
          <Link
            to={`/posts/categories/${post?.category}`}
            className="post-item-category"
          >
            {post?.category}
          </Link>
        </div>
        <p className="post-item-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde animi
          dolore commodi ea laudantium sed ab maxime optio ad dicta, vero illum?
          Eos in quidem minus quas repellendus architecto deleniti.
        </p>
        <Link to={`/posts/details/${post._id}`} className="post-item-link">Read More....</Link>
      </div>
    </div>
  );
};

export default PostItem;
