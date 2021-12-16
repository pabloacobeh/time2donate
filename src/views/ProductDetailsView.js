import { useParams } from "react-router";
import { CommentContext } from "../context/CommentContext";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";
import CommentForm from "../components/CommentForm";

const ProductDetailView = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { singleProduct, getProductById } = useContext(ProductContext);
  const [singleComment, setSingleComment] = useState({
    user: "",
    product: "",
    content: "",
  });

  const {
    setComments,
    getCommentsFromProduct,
    comments,
    createComment,
    deleteComment,
  } = useContext(CommentContext);

  useEffect(() => {
    getProductById(id);
    getCommentsFromProduct(id);
    setSingleComment({
      ...singleComment,
      product: id,
    });
  }, []);

  const handleCommentChange = (event) => {
    setSingleComment({
      ...singleComment,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createComment(singleComment);
    setSingleComment({
      user: "",
      product: id,
      content: "",
    });
  };

  const handleDelete = async (comment) => {
    const filtered = comments.filter((val) => val != comment);
    setComments(filtered);
    await deleteComment(comment, comment._id);
  };

  return (
    <div className="container mt-5 productDetails">
      <h2>{singleProduct.title}</h2>
      <div className="row">
        <div>
          <b>Category:</b> <h5>{singleProduct.category?.name}</h5>
        </div>
        <h4>
          <b>Description:</b>
        </h4>
        <h5>{singleProduct.description}</h5>
        <p>Donated By {singleProduct.userOwner?.name} </p>
        {comments?.map((comment) => (
          <div key={comment._id}>
            <CommentCard func={() => handleDelete(comment)} comment={comment} />
          </div>
        ))}

        <img
          style={{ height: "500px", margin: "40px auto" }}
          src={singleProduct.image1}
          alt=""
        />
        <div className="row">
          <CommentForm
            handleCommentChange={handleCommentChange}
            singleComment={singleComment}
            func={handleSubmit}
          />

          <div style={{ minHeight: 80 }} className="col-4 tags mt-2">
            {user && user?._id === singleProduct.userOwner?._id && (
              <Link to={`/editProduct/${id}`} className="btn btn-outline-dark">
                Edit
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
