import React, { Component } from "react";
import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
import {Switch, Route, Link} from 'react-router-dom';
import ProductsList from "./components/products-list.component";
import AddProduct from "./components/add-product.component";
import Product from "./components/product.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import ProductDetailList from "./components/product-details.component";


class App extends Component {
  constructor(props) {
    super(props);
    
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser(){
    const username = localStorage.getItem('username');
    this.setState({
      username: username
    });
  }

  logout(){
    const username = localStorage.removeItem('username');
    localStorage.removeItem('validUser');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    this.setState({
      username: username
    });
  }

  render(){
    return (
      <div>
          <header className="navbar">
              <a href="/products" className="logo link">
              Product
              </a>
              <nav className="nav">
                  <div className="nav__link-box">
                      <div className="nav__link">
                        <Link to={"/products"} className="link">
                          Products
                        </Link>         
                      </div>
                  </div>
                  <div className="nav__link-box">
                      <div className="nav__link">
                        <Link to={"/add"} className="link">
                          Add
                        </Link> 
                         
                      </div>
                      
                  </div>
                  {this.state.username ? ( 
                  <div className="nav__link-box">
                      <div className="nav__link">
                        <h2>{this.state.username}</h2> 
                         
                      </div>
                      
                  </div>
                  ) : ( 
                  <div className="nav__link-box">
                      <div className="nav__link">
                        <Link to={"/login"} className="link">
                          Login
                        </Link> 
                         
                      </div>
                      
                  </div>)
                  }
                  {this.state.username &&
                  <div className="nav__link-box">
                      <div className="nav__link">
                        <a href="#" className="link" onClick={this.logout}>Log Out</a> 
                         
                      </div>
                      
                  </div>}
              </nav>
          </header>

          <div className="container">
            <Switch>
              <Route exact path={["/", "/products"]} component={ProductsList} />
              <Route exact path="/add" component={AddProduct} />
              <Route path="/products/:id" component={Product} />
              <Route path="/product/:id" component={ProductDetailList} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>

          <footer className='footer'>
            <p>
              Created By AbdulAzeez
            </p>
          </footer>
        </div>
        
    );
  }
}

export default App;
