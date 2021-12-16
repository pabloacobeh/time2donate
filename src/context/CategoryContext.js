import { createContext, useState, useEffect } from "react";
import apiHelper from "../apiHelper/apiHelper";

export const CategoryContext = createContext({});

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await apiHelper("/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    const response = await apiHelper.delete(`/categories/category/${id}`);
    return response;
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
