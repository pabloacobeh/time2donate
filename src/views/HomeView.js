import { useContext, useState } from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";

const HomeView = () => {
  const [search, setSearch] = useState("");
  const { products } = useContext(ProductContext);

  const handleSearch = (event) => setSearch(event.target.value.toLowerCase());

  return (
    <div className="container mt-5">
      <h2 className="donations">Donations</h2>
      <div className="col-md-3 col-sm-6 mb-3">
        <input
          className="form-control"
          onChange={handleSearch}
          style={{ display: "flex", alignSelf: "flex-end" }}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-6 col-lg-4 col-sm-6">
            <ProductCard key={product._id} obj={product} />
          </div>
        ))}
      </div>

      {/* <div className="row productCards">
        {products
          .filter((product) =>
            search ? product.title.toLowerCase().includes(search) : product
          )
          .map((product) => (
            <div
              key={product._id}
              className="cardBox col-lg-3 col-md-4 col-sm-6 col-xs-12"
            >
              <ProductCard obj={product} />
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default HomeView;
