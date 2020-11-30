import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";

export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveProducts = this.retrieveProducts.bind(this);
    this.removeAllProducts = this.removeAllProducts.bind(this);
    this.searchName = this.searchName.bind(this);
    this.getUser = this.getUser.bind(this);

    this.state = {
      username: '',
      isAdmin: '',
      products: [],
      searchName: "",
      successMsg: "",
      errorMsg: ""
    };
  }

  componentDidMount() {
    this.retrieveProducts();
    this.getUser();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveProducts() {
    ProductDataService.getAll()
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getUser(){
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isAdmin');
    this.setState({
      isAdmin: isAdmin,
      username: username
    });
  }

  removeAllProducts() {
    ProductDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        this.setState({errorMsg: "Delete Failed.. Access denied"});
      });
  }

  searchName() {
    ProductDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          products: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { searchName, products } = this.state;

    return (
      <div className="content">
        <div className="col">
          <form action="#" className="search">
              <input
              type="text"
              className="search__input"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
              />
              <button
                className="search__button"
                type="button"
                onClick={this.searchName}
              >
                <div className="search__icon">
                  Search
                </div>
              </button>
          </form>
            
        </div>
        <div className="product-container">
          <h4 className="heading-1">Products</h4>

          {this.state.errorMsg.length > 0 && <div className='danger'>
            <br />
            <p>{this.state.errorMsg}</p>
          </div> }
          {this.state.successMsg.length > 0 && <div  className='success'>
            <br />
            <p>{this.state.successMsg}</p>
          </div> }
          <div className="product-group">
            {products &&
              products.map((product, index) => (
                <Link
                to={"/product/" + product.id} className="link">
              
                <div className={"product-group-item " } key={index}>
                  <img src={product.image} alt="loading..." className="product-img"></img> 
                  <p className='product-name'>{this.capitalizeFirstLetter(product.name)}</p>
                  <p className='product-price'>#{product.price}</p>
                </div>
                </Link>
              ))}
              
          </div>
          {this.state.isAdmin &&
          <button className="btn btn-sm btn-danger" onClick={this.removeAllProducts}>
            Remove All
          </button>
          }

          
        </div>
      </div>
    );
  }
}