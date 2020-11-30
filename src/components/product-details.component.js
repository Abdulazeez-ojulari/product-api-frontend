import React, { Component } from "react";
import ProductDataService from "../services/product.service";
import { Link } from "react-router-dom";

export default class ProductDetailList extends Component {
  constructor(props) {
    super(props);
    this.getUser = this.getUser.bind(this);
    this.getUser = this.getUser.bind(this);
    
    this.state = {
      username: '',
      isAdmin: '',
      product: {},
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
    this.getUser();
  }


  getUser(){
    const username = localStorage.getItem('username');
    const isAdmin = localStorage.getItem('isAdmin');
    this.setState({
      isAdmin: isAdmin,
      username: username
    });
  }

  getProduct(id) {
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          product: response.data
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
    const { product } = this.state;

    return (
      <div className="content">
        <div className="product-details">
          {product ? (
            <div className="product-details-row">
              <h4 className="heading-1">Product</h4>
              <div className="product-details-col">
                <label>
                  <h5 className="heading-2">Image:</h5>
                </label>{" "}
                <img src={product.image} alt={product.name}/>{product.image ? "" : "Sorry No Image"}
              </div>
              <div className="product-details-col">
                <label>
                  <h5 className="heading-2">Name:</h5>
                </label>{" "}
                {product.name}
              </div>
              <div className="product-details-col">
                <label>
                  <h5 className="heading-2">Price:</h5>
                </label>{" "}
                #{product.price}
              </div>
              {this.state.isAdmin &&
              <Link
                to={"/products/" + product.id}
                className="btn btn-sm btn-full"
              >
                Edit
              </Link>
              }
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a product...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}