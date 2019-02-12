import React, { Component } from "react";
import "./App.css";
import ProductList from "../components/productList";
import SearchForm from "../components/searchForm";
import HttpService from "../services/http-service";

const http = new HttpService();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { itemList: [] };
    this.getKeyWord = this.getKeyWord.bind(this);
  }

  getKeyWord = keyword => {
    http.getData(keyword).then(data => {
      if (data.itemIds) {
        this.setState({ itemList: data.itemIds });
      } else {
        this.setState({ itemList: [] });
      }
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <SearchForm onSubmit={this.getKeyWord} />
        </div>
        <div>
          <h3>{this.state.itemList.length} relevant items found</h3>
        </div>
        <div>
          <ProductList itemList={this.state.itemList} />
        </div>
      </div>
    );
  }
}

export default App;
