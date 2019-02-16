import React from "react";
import "./product.css";

function Product(props) {
  return (
    <div className="card product mx-auto d-block">
      <img className="card-img-top" src={props.product.imgUrl} alt="Product" />
      <div className="card-body">
        <h4 className="card-title">{props.product.name}</h4>
        <p className="card-text">Price: ${props.product.price}</p>
        <a
          href={props.product.webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Go to website
        </a>
      </div>
    </div>
  );
}

export default Product;
