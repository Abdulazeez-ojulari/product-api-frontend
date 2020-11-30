import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link} from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      email: "",
      password: "", 
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
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

  register(e) {
    e.preventDefault();
    var data = {
        name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    UserDataService.register(data)
      .then(response => {
        this.setState({
          name: response.data.email,
          email: response.data.email,
          password: response.data.password
        });
        localStorage.setItem('isAdmin', response.data['isAdmin']);
        localStorage.setItem('username', response.data['name']);
        localStorage.setItem('token', response.headers.xauthtoken);
        window.location.reload();
        this.props.history.push('/');
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    return (
      <div className="form-container">
          <form className="form">
                        
              <div className="formrow">
                  <div className="formcol-1">
                        <div className="formgroup">
                        <label htmlFor="name" className="formlabel">Name</label>
                        <input
                          type="text"
                          className="forminput"
                          id="name"
                          required
                          value={this.state.name}
                          onChange={this.onChangeName}
                          name="name"
                        />
                      </div>
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
            <button onClick={this.register} className="btn btn-outline btn-bg">
              Register
            </button>
          </form>
          <p className='p'>Already have an account? Please
            <div className="nav__link-box">
              <div className="nav__link">
                <Link to={"/login"} className="link">
                  Login
                </Link> 
                  
              </div>
            </div>
          </p>
      </div>
    );
  }
}