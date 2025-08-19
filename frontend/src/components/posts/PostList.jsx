import "./posts.css";
import PostItem from "./PostItem";

const PostList = ({posts}) => {
  return (
    <div className="post-list">
      {(posts && posts.length > 0) ? (posts?.map(item => <PostItem post={item} key={item._id}/>)
      ): (
        <p>No posts found.</p>
      )}

    </div>
  );
};

export default PostList;
 