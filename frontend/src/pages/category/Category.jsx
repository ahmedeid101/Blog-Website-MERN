import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsCategory } from "../../redux/apiCalls/postApiCalls";

const Category = () => {
    const {postCategory} = useSelector(state => state.post);
      const dispatch = useDispatch();
  
    const { category } = useParams();

    useEffect(() => {
      dispatch(fetchPostsCategory(category));
      window.scrollTo(0,0);
    }, [category, dispatch]);

    return ( 
    <section className="category">
      {postCategory.length === 0 ?
      <>
        <h1 className="category-not-found">
          Posts whith <span>{category}</span> Category not found
        </h1>
        <Link to="/posts" className="category-not-found-link">
          Go To Posts Page
        </Link>
      </>
      :
      <>
        <h1 className="category-title">Posts based on {category}</h1>
        <PostList posts={postCategory} />
      </>
      }
 
    </section> );
}
 
export default Category;