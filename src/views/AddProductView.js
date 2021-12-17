import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import { ProductContext } from "../context/ProductContext";

const AddProductView = () => {
  const { singleProduct, setSingleProduct, createProduct } =
    useContext(ProductContext);
  const { categories } = useContext(CategoryContext);
  const [selected, setSelected] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    userOwner: "",
    category: "",
    description: "",
    image1: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setSingleProduct();
  }, []);

  useEffect(() => {
    setSingleProduct({
      title: "",
      userOwner: "",
      category: "",
      description: "",
      image1: "",
    });
  }, []);

  const handleChange = (event) => {
    setSingleProduct({
      ...singleProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setProduct({
      ...product,
      image1: imageFile,
    });
    // setPreview(URL.createObjectURL(imageFile));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSingleProduct();
    createProduct(singleProduct);
    setSingleProduct({
      title: "",
      userOwner: "",
      category: "",
      description: "",
      image1: "",
    });
    navigate("/");
  };

  return (
    <div className="addProduct">
      <form className="form">
        <h2>New Donation</h2>
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
        <select
          onChange={handleChange}
          defaultValue={"Select Category"}
          className="form-control"
          name="category"
          id=""
        >
          <option disabled value="Select Category">
            Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          onChange={handleImageChange}
          placeholder="image"
          accept="image"
          name="image1"
          type="file"
          className="form-control"
        />

        <button
          onClick={handleSubmit}
          className="btn btn-outline-dark form-control"
        >
          Post Donation
        </button>
      </form>
    </div>
  );
};

export default AddProductView;
