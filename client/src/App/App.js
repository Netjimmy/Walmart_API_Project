import React, { Component } from "react";
import "./App.css";
// import ProductList from "../components/productList";
import SearchForm from "../components/searchForm";
import HttpService from "../services/http-service";

const http = new HttpService();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <div>
          <SearchForm onSubmit={() => console.log("here")} />
        </div>
        <div />
        <div />
      </div>
    );
  }
}

export default App;
