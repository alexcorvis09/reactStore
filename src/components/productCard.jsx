import { useEffect, useState } from "react";

export default function ProductCard(props) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${props.id}`)
      .then((response) => response.json())
      .then((json) => {
        setProduct(json);
      })
      .catch((error) => {
        console.log("Error fetching product:", error);
      });
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 size-[260px] content-center">
      <img className="w-fit h-52" src={props.thumbnail} alt={props.title} />
      <p className="text-black font-bold p-1">{props.title}</p>
      <p>{props.price}</p>
      <button className="bg-zinc-200 p-2 rounded-md hover:bg-zinc-400">
        Add to Cart
      </button>
    </div>
  );
}
