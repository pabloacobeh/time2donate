import { createContext, useState } from "react";
import apiHelper from "../apiHelper/apiHelper";
import { toast } from "react-toastify";

export const CommentContext = createContext({});

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [singleComment, setSingleComment] = useState({
    user: "",
    product: "",
    content: "",
  });
  const jwt_string = "jwttime2donate";

  const getCommentsFromProduct = async (id) => {
    try {
      const response = await apiHelper.get(`/comments/product/${id}`);
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createComment = async (obj) => {
    try {
      let { user } = JSON.parse(localStorage.getItem(jwt_string));
      obj.user = user._id;
      const response = await apiHelper.post("/comments/comment", obj);
      getCommentsFromPost(obj.product);
    } catch (error) {
      toast.error("You have to be logged in to comment on posts");
    }
  };

  const deleteComment = async (obj) => {
    let { user } = JSON.parse(localStorage.getItem(jwt_string));
    if (user._id !== obj.user._id) return;
    try {
      await apiHelper.delete(`/comments/comment/${obj._id}`);
      console.log("HERE", obj.product);
      await getCommentsFromProduct(obj.product._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,
        getCommentsFromProduct,
        singleComment,
        setSingleComment,
        createComment,
        deleteComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentProvider;
