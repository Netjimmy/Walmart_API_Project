import React, { Component } from "react";
import "./product.css";

class Product extends Component {
  render() {
    return (
      <div className="card product">
        <img className="card-img-top" src={this.props.imgUrl} alt="Product" />
        <div className="card-body">
          <h4 className="card-title">{this.props.title}</h4>
          <p className="card-text">Price: ${this.props.price}</p>
          <a href={this.props.webUrl} className="btn btn-primary">
            Go to website
          </a>
        </div>
      </div>
    );
  }
}

export default Product;
