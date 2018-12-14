import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions"; //import action, curly brackets

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
    this.props.registerUser(newUser);
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
                  <div className="form-group">
                    <input
                      type="text"
                      //default classes
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.name //<-- depending on which Validator is hit at function validateRegisterInput)
                      })}
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={this.onChange}
                      name="email"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                    <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                      name="password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password2
                      })}
                      placeholder="Confirm Password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      name="password2"
                    />
                    {errors.password2 && (
                      <div className="invalid-feedback">{errors.password2}</div>
                    )}
                  </div>
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
)(Register);

//Workflow
//commit action registerUser in authAction file
//in registerUser, we created a type of TEST_DISPATCH (simple string for testing) and payload
//those two were send to reducer
//inside reducer (authReducer.js), we manipulated state to include the new user
//in component Register.js, mapped state to props in mapStateToProps function
//we set auth in mapStatetoProps to be part of component
//then we just grabbed the user from the auth prop and displayed it in the DOM
