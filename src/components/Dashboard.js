import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/action/actions";

class Dashboard extends Component {
  logoutOnClick = () => {
    this.props.logout();
    this.props.history.replace("/");
  };
  render() {
    return (
      <div className="container mt-5">
        {this.props.authenticated ? (
          <div>
            <table className="table table-striped">
              <thead className="thead ">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Age</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {this.props.dashBoardData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-warning col-sm-1 offset-sm-5 text-align-center"
              onClick={this.logoutOnClick}
            >
              Logout
            </button>
          </div>
        ) : (
          <h3>Login to view the content...</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dashBoardData: state.dashBoardData,
    authenticated: state.authenticated,
    loading: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
