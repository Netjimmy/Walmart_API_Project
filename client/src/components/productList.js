import React from "react";
import Product from "./product.js";

function ProductList(props) {
  const list = props.itemList.map(product => (
    <Product product={product} key={product.itemId} />
  ));
  return <div>{list}</div>;
}

export default ProductList;
