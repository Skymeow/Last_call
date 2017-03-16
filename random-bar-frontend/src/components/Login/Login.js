import React, {Component} from "react";
import {Link, browserHistory} from "react-router";
import update from "react-addons-update";

import Nav from "../Nav/Nav";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state={
      user: {}
    }
  }

  handleChange(event) {
    let newState = update(this.state, {
      user: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });

    this.setState(newState);
  }

  componentDidMount(){
    fetch(`http://localhost:3000/login`,{
      method:"GET",
      headers: {
         "Authorization": window.localStorage.getItem("token")
      }
    })
    .then((results)=>{
      results.json().then((content)=>{
        this.setState({user: content.user})
      })
    })
    .catch((err)=>{
      browserHistory.push("/:user_id/dashboard");
    })
  }

  handleSubmit(event) {
    event.preventDefault();
     fetch(`http://localhost:8000/users/login`, {
      method: "POST",
      body: JSON.stringify({
        user: this.state.user
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {

      browserHistory.push("/")
    })
    .catch((err) => {
      console.log("ERROR:", err);
    })
  }

  render() {
    return (
     <div>
     <Nav />
        <div className="container">
          <h2>Login Here</h2>
          <div className="form-container">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <h4>Email:</h4>
              <input name="email" type="email" onChange={this.handleChange.bind(this)} />
              <h4>Password:</h4>
              <input name="password" type="password" onChange={this.handleChange.bind(this)} />
              <button className="standard-btn" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
