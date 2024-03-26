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
    <div>
      <img src={props.thumbnail} alt="" />
      <p className="text-black">{props.title}</p>
      <p>{props.price}</p>
    </div>
  );
}
