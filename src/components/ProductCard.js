import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import React from "react";

const defaultImage =
  "https://www.stfrancishs.org/sites/main/files/imagecache/medium/main-images/donate_heart_button__2.png?1578342162";

const ProductCard = ({ obj }) => {
  return (
    <Card className="productCard">
      <Card.Body>
        <Card.Title>{obj.title}</Card.Title>

        <img
          className="image1"
          src={obj.image1 ? obj.image1 : defaultImage}
          alt=""
        />
        <span className="bottomLayer">
          <Link className="btn btn-outline-dark" to={`/product/${obj._id}`}>
            View More
          </Link>
        </span>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
