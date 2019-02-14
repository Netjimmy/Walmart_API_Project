import React, { Component } from "react";
import { Form } from "semantic-ui-react";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: "" };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  render() {
    return (
      <div>
        <h2>Please enter a keyword to search items in Walmart!</h2>
        <Form>
          <Form.Input
            placeholder="ex: backpack"
            name="keyword"
            value={this.state.keyword}
            onChange={this.handleChange}
          />
          <Form.Button
            content="Submit"
            onClick={() => {
              this.props.onSubmit(this.state.keyword);
            }}
          />
        </Form>
      </div>
    );
  }
}

export default SearchForm;
