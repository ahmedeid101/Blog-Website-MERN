import "./sidebar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategoies } from "../../redux/apiCalls/categoryApiCall";

const Sidebar = () => {
  const {categories} = useSelector(state => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCategoies());
  }, [dispatch]);
  return (
    <div className="sidebar">
      <h5 className="sidebar-title">CATEGORIES</h5>
      <ul className="sidebar-links">
        {categories.map((Category) => (
          <Link 
          className="sidebar-link"
          key={Category._id}
          to={`/posts/categories/${Category.title}`}
          >
            {Category.title}
          </Link>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;
