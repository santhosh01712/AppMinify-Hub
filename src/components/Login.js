import React, { Component } from "react";
import { connect } from "react-redux";
import { validations } from "../utilities/validations";
import * as actions from "../store/action/actions";

class Login extends Component {
  state = {
    userData: {
      username: "",
      password: "",
    },
    errorMessage: "",
  };
  changeHandler = (e) => {
    let oldUserData = { ...this.state.userData };
    oldUserData[e.target.name] = e.target.value;
    this.setState({ userData: oldUserData });
  };
  validate = (event) => {
    event.preventDefault();
    let [validInputs, errorMessage] = validations(
      this.state.userData.username,
      this.state.userData.password
    );
    if (validInputs) {
      this.setState({ errorMessage: "" });
      this.props.tryLogin(
        this.state.userData.username,
        this.state.userData.password
      );
    } else {
      this.setState({ errorMessage: errorMessage });
    }
  };
  componentDidUpdate() {
    if (this.props.authenticated) {
      this.props.history.replace("/dashboard");
    }
  }
  render() {
    const content = this.props.loading ? (
      <h1>Loading....</h1>
    ) : (
      <form onSubmit={this.validate} className="col-sm-6 offset-sm-3">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="email"
            name="username"
            required
            placeholder="user@mail.com"
            value={this.state.userData.username}
            onChange={(e) => this.changeHandler(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            required
            placeholder="Enter your Password"
            value={this.state.userData.password}
            onChange={(e) => this.changeHandler(e)}
          />
        </div>
        <div>
          <strong className="form-text text-danger">
            {this.state.errorMessage ||
              this.props.errorMessageex.split("_").join(" ")}
          </strong>
        </div>
        <button
          className="btn btn-primary m-2 "
          type="submit"
          onClick={this.validate}
        >
          Login
        </button>
      </form>
    );

    return (
      <div className="container">
        <div className="row mt-5">{content}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
    errorMessageex: state.errorMessage,
    authenticated: state.authenticated,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: (username, password) =>
      dispatch(actions.tryLogin(username, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
