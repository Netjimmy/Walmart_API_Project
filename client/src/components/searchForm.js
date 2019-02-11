import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "", submitKeyword: "" };

    //binding
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { keyword } = this.state;
    this.setState({ submitKeyword: keyword });
  };

  render() {
    return (
      <div>
        <h2>Please enter a keyword to search items in Walmart!</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="keyword"
            name="keyword"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" />
        </Form>
        <strong>onChange:</strong>
        <pre>{this.state.keyword}</pre>
        <strong>onSubmit:</strong>
        <pre>{this.state.submitKeyword}</pre>
      </div>
    );
  }
}

export default SearchForm;
