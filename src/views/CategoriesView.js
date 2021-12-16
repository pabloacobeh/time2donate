import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { deleteCategory } from "../context/CategoryContext";

const CategoriesView = () => {
  const [categories, setCategories] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await axios.get(`${apiUrl}/categories`);
    setCategories(response.data);
  };

  const deleteCategory = (id) => {
    const filtered = categories.filter((category) => {
      return category._id !== id;
    });
    deleteCategory(id);
    setCategories(filtered);
  };

  return (
    <div className="container mt-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{category.name}</td>
              <td>
                <button
                  onClick={() => deleteCategory(category._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoriesView;
