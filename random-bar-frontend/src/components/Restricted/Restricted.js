import React, { Component } from "react";
import { browserHistory } from "react-router";

class SavedBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  // when the component is about to mount check for auth token
  componentWillMount() {
    if (!localStorage.getItem("token")) {
      browserHistory.push("/users/login");
    }
  }

  // get dynamic content from server using saved JWT
  componentDidMount() {
    fetch(`http://localhost:8000/restricted`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${window.localStorage.getItem("token")}`
      }
    })
    .then((results) => {
      results.json().then((content) => {
        this.setState({ message: content.message })
      })
    })
    .catch((err) => {
      browserHistory.push("/login");
    })
  }

  render() {
    return (
      <h1>{this.state.message}</h1>
    )
  }
}
 export default Restricted;
