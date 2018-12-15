import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../actions/profileActions.js";

class Dashboard extends Component {
  //to call it right away, use lifecycle method
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    return <div />;
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(Dashboard);
