import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const HomeView = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="container mt-5">
      <h2 className="donations">Donations</h2>
      {products.map((product) => (
        <ProductCard key={product._id} obj={product} />
      ))}
    </div>
  );
};

export default HomeView;
