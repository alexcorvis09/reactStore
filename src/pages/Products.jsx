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
    <main className="bg-zinc-200 text-white min-h-screen flex flex-col items-center gap-10">
      <header className="w-full">
        <div className=" bg-white flex justify-around items-center h-20">
          <a href="/" className="text-black">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
              alt="Home"
              className="size-12"
            />
            App Store
          </a>
          <div>
            <input
              className="p-2 w-80 border-2 border-gray-300 rounded-lg"
              type="text"
              placeholder="Search..."
            />
            <button>🔍</button>
          </div>

          <div className="flex row-end-2 justify-between items-center">
            <a
              className=" text-black p-3 border-2 border-white hover:bg-zinc-600/40 hover:border-2 hover: border-blue-600/40 rounded-lg place-content-center"
              href="/login"
            >
              Log In
            </a>
            <a
              className="p-3 text-zinc-600 border-2 border-zinc-400 rounded-lg hover:bg-zinc-400 hover:text-white"
              href="/"
            >
              Create Account
            </a>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-3 gap-20 w-full max-w-screen-md text-black">
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
