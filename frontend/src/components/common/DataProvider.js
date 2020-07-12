import React, { Component } from "react";
import PropTypes from "prop-types";
class DataProvider extends Component {

  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
  };

  state = {
      data: [],
      loaded: false,
      placeholder: "Loading..."
  };

  componentDidMount() {
      console.log(localStorage.getItem("token"));
      const conf = {
          method: "GET",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem("token")
          }
      }

    fetch(this.props.endpoint, conf)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState({ data: data, loaded: true }));
  }

  render() {
    const { data, loaded, placeholder } = this.state;
    return loaded ? this.props.render(data) : <p>{placeholder}</p>;
  }
}
export default DataProvider;