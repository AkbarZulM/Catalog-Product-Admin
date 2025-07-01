import CardList from "./CardList";
import { useEffect, useState } from "react";
import { getProducts } from "../service/Product";
const Card = () => {
  const [dataProduct, setGetProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setGetProducts(products.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="rounded-lg p-4">
      <CardList data={dataProduct} />
    </div>
  );
};

export default Card;
