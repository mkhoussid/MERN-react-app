import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions"; //import action, curly brackets
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //if user is logged in, make sure they cant go to /register or /login
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  //get errors from redux state (gets put into props with mapStateToProps)
  componentWillReceiveProps(nextProps) {
    //once new properties are received
    if (nextProps.errors) {
      // if errors are included, set to component state (above on line ~15)
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    //actions are called through props
    this.props.registerUser(newUser, this.props.history); //<-- allows us to redirect from within this action
  }

  render() {
    //destructure errors from state by creating new const variable
    const { errors } = this.state; // same as 'const errors = this.state.errors;'

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your Dev<span className="lt">&lt;</span>-n account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//access state through props
const mapStateToProps = state => ({
  auth: state.auth, //comes from rootReducer
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser } //second parameter is where actions are mapped
)(withRouter(Register));

//Workflow
//commit action registerUser in authAction file
//in registerUser, we created a type of TEST_DISPATCH (simple string for testing) and payload
//those two were send to reducer
//inside reducer (authReducer.js), we manipulated state to include the new user
//in component Register.js, mapped state to props in mapStateToProps function
//we set auth in mapStatetoProps to be part of component
//then we just grabbed the user from the auth prop and displayed it in the DOM
