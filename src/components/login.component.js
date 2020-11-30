import React, { Component } from "react";
import UserDataService from "../services/user.service";
import {Link} from 'react-router-dom';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  login(e) {
    e.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    UserDataService.login(data)
      .then(response => {
        this.setState({
          email: response.data.email,
          password: response.data.password
        });
        localStorage.setItem('isAdmin', response.data['isAdmin']);
        localStorage.setItem('username', response.data['name']);
        localStorage.setItem('token', response.headers.xauthtoken);
        window.location.reload();
        this.props.history.push('/')
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    return (
      <div className="form-container">
          {this.state.errorMsg.length > 0 && <div className='danger'>
            <br />
            <p>{this.state.errorMsg}</p>
          </div> }
          {this.state.successMsg.length > 0 && <div  className='success'>
            <br />
            <p>{this.state.successMsg}</p>
          </div> }
          <form className="form">
                        
              <div className="formrow">
                  <div className="formcol-1">
                      <div className="formgroup">
                        <label htmlFor="email" className="formlabel">Email</label>
                        <input
                          type="text"
                          className="forminput"
                          id="email"
                          required
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          name="email"
                        />
                      </div>
                      
                      <div className="formgroup">
                        <label htmlFor="password" className="formlabel">Password</label>
                          <input
                            type="password"
                            className="forminput"
                            id="password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            name="password"
                          />
                          
                      </div>
                      
                  </div>
              </div>
            <button onClick={this.login} className="btn btn-outline btn-bg">
              Login
            </button>
          </form>
          <p className="p">Don't have and account yet? Please
            <div className="nav__link-box">
              <div className="nav__link">
                <Link to={"/register"} className="link">
                  Register
                </Link> 
                
              </div>
            </div>
          </p>
      </div>
    );
  }
}