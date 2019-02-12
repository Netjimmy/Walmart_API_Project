import React, { Component } from "react";
import Product from "./product.js";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.getProductList = this.getProductList.bind(this);
  }

  getProductList = () => {
    const list = this.props.itemList.map(product => (
      <Product product={product} key={product.itemId} />
    ));
    return list;
  };

  render() {
    return <div>{this.getProductList()}</div>;
  }
}

export default ProductList;
