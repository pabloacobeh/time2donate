import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";

const EditProductView = () => {
  const {
    singleProduct,
    getProductById,
    setSingleProduct,
    editProduct,
    deleteProduct,
  } = useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const { user } = JSON.parse(localStorage.getItem("jwttime2dinate"));

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSingleProduct();
  }, []);

  useEffect(() => {
    getProductById(id);
  }, []);

  const handleChange = (event) => {
    setSingleProduct({
      ...singleProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await editProduct(id, singleProduct);
  };

  const handleImageChange = async (event) => {
    const option = window.confirm("Are you sure you want to update the image");
    if (!option) return;
    const imageFile = event.target.files[0];
    // await imageUploadToApi(id, imageFile);
    setSingleProduct();
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    let choice = window.confirm("Are you sure?");
    if (!choice) return;
    await deleteProduct(id);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <form className="form">
        <h2>Edit Product: {singleProduct.title}</h2>
        <label>Title</label>
        <input
          name="title"
          value={singleProduct.title}
          onChange={handleChange}
          className="form-control"
          type="text"
          placeholder="title"
        />
        <label>Description</label>
        <textarea
          name="description"
          value={singleProduct.description}
          onChange={handleChange}
          className="form-control my-3"
          type="text"
          placeholder="description"
        />
        <input
          onChange={handleImageChange}
          placeholder="image1"
          accept="image"
          name="image1"
          type="file"
          className="form-control"
        />
        {/* <input
          onChange={handleImageChange}
          placeholder="image2"
          accept="image"
          name="image2"
          type="file"
          className="form-control"
        />
        <input
          onChange={handleImageChange}
          placeholder="image3"
          accept="image"
          name="image3"
          type="file"
          className="form-control"
        />
        <input
          onChange={handleImageChange}
          placeholder="image4"
          accept="image"
          name="image4"
          type="file"
          className="form-control"
        /> */}

        {user._id === singleProduct.userOwner._id && (
          <>
            <button
              onClick={handleSubmit}
              className="btn btn-outline-dark form-control mb-3"
            >
              Update Product
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline-danger form-control"
            >
              Delete Product
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default EditProductView;
