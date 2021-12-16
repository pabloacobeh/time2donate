import { Link } from "react-router-dom";

const ProductCard = ({ obj }) => {
  return (
    <div className="productCard">
      <h4>{obj.title}</h4>

      <img
        className="image1"
        src={obj.image1 ? obj.image1 : productImage}
        alt=""
      />
      <span className="bottomLayer">
        <Link className="btn btn-outline-dark" to={`/product/${obj._id}`}>
          View More
        </Link>
      </span>
    </div>
  );
};

export default ProductCard;
