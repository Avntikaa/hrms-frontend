// Working code 
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Box, Typography, InputLabel, MenuItem, TextField, FormControl, Select } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import "./login.css"; // Import the CSS file


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeErole = this.onChangeErole.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      erole: "",
      username: "",
      password: "",
      loading: false,
    };
  }

  onChangeErole(e) {
    this.setState({
      erole: e.target.value,
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password, this.state.erole))
        .then(() => {
          
          if (this.state.erole === "Admin") {
            history.push("/hr-home");
          } else if (this.state.erole === "Manager") {
            history.push("/manager-home");
          } else if (this.state.erole === "Employee") {
            history.push("/employee-home")
          } else {
            alert("Oops! Reload and Retry!");
            history.push("/login");
          }
          window.location.reload();
        })
        
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to="/profile" />;
    }

    return (
      <Box style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px" }}>
        <div className="login-container">
          <div className="login-form">
            <Typography variant="h4" align="center">
              Login <LockOpenIcon color="default" fontSize="large" />
            </Typography>
            <br></br>
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <FormControl required variant="outlined" fullWidth>
                  <InputLabel required>Role</InputLabel>
                  <Select
                    fullWidth
                    label="role"
                    name="erole"
                    value={this.state.erole}
                    onChange={this.onChangeErole}
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="form-group" backgroundColor='none'>
                <TextField
                  required
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  label="Username"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <TextField
                  required
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>
              <br></br>
              <div className="form-group">
                <button
                  className="btn btn-dark btn-block"
                  disabled={this.state.loading}
                  style={{ backgroundColor: '#98144d' }}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  &nbsp;&nbsp;
                  <span>Login</span>
                </button>
              </div>

              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
          <div className="login-bg">
            <img src="./limage.jpg" height={400}></img>
          </div>
        </div>
      </Box>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);