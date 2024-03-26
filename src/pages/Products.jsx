import clsx from "clsx";
import { useEffect, useState } from "react";
import ProductCard from "../components/productCard";

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setProducts(json.products);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  return (
    <main className="bg-zinc-200 text-white min-h-screen flex flex-col items-center p-8 gap-10">
      <header></header>
      <section className="grid grid-cols-4 gap-4 w-full max-w-screen-md text-black">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={`product-${index}`}
              thumbnail={product.thumbnail}
              id={product.id}
              title={product.title}
              price={`$${product.price}`}
            />
          );
        })}
      </section>
    </main>
  );
}
