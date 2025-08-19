<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import Swal from "sweetalert2";
import { deleteCategory, fetchCategoies } from "../../redux/apiCalls/categoryApiCall";
import { useEffect } from "react";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(fetchCategoies());
  }, [dispatch]);

  // Delete Category Handler
  const deleteCategoryHandler = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(categoryId));
=======
import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";

const CategoriesTable = () => {
  // Delete Category Handler
  const deleteCategoryHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Category has been deleted!", {
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
        <h1 className="table-title">Categories</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
<<<<<<< HEAD
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  {item.title}
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCategoryHandler(item._id)}>
=======
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <b>music</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={deleteCategoryHandler}>
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
                      Delete Category
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

export default CategoriesTable;
