import "./sidebar.css";
import { Link } from "react-router-dom";
import { categories, posts } from "../../dummyData";

const Sidebar = () => {
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
