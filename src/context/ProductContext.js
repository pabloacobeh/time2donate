import { createContext, useState, UseEffect, useEffect } from "react";
import apiHelper from "../apiHelper/apiHelper";

export const ProductContext = createContext({});

const ProductProvider = ({ children }) => {
  const jwt_string = "jwttime2donate";
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState({
    title: "",
    userOwner: "",
    category: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    const response = await apiHelper.get("/products");
    setProducts(response.data);
  };

  const getProductById = async (id) => {
    console.log("ID", id);
    try {
      const response = await apiHelper.get(`/products/product/${id}`);
      setSingleProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (obj) => {
    let { user } = JSON.parse(localStorage.getItem(jwt_string));
    obj.userOwner = user._id;
    const response = await apiHelper.post("/products/product", obj);
    toast.success("Product created");
    getAllProducts();
  };

  const editProduct = async (id, obj) => {
    let { user } = JSON.parse(localStorage.getItem(jwt_string));
    if (obj.userOwner._id !== user._id) return;
    const response = await apiHelper.put(`/products/product/${id}`, obj);
    toast.sucess("Product updated");
    getAllProducts();
  };

  const imageUpload = async (id, img) => {
    const formData = new FormData();
    formData.append("image", img);
    const response = apiHelper.post(
      `/products/product/imageUpload/${id}`,
      formData
    );
    return response;
  };

  const deleteProduct = async (id) => {
    await apiHelper.delete(`/products/product/${id}`);
    toast.error("Product deleted");
    getAllProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        singleProduct,
        getProductById,
        createProduct,
        editProduct,
        deleteProduct,
        setSingleProduct,
        imageUpload,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
