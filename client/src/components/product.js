import React, { Component } from "react";
import "./product.css";

class Product extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card product mx-auto d-block">
        <img
          className="card-img-top"
          src={this.props.product.imgUrl}
          alt="Product"
        />
        <div className="card-body">
          <h4 className="card-title">{this.props.product.name}</h4>
          <p className="card-text">Price: ${this.props.product.price}</p>
          <a
            href={this.props.product.webUrl}
            target="_blank"
            className="btn btn-primary"
          >
            Go to website
          </a>
        </div>
      </div>
    );
  }
}

export default Product;
