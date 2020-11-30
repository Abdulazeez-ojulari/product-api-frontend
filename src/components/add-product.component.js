import React, { Component } from "react";
import ProductDataService from "../services/product.service";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.newProduct = this.newProduct.bind(this);

    this.state = {
      id: null,
      name: "",
      image: "", 
      price: "",

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
    
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  saveProduct(e) {
    e.preventDefault();
    var data = {
      name: this.state.name,
      image: this.state.image,
      price: this.state.price
    };
    ProductDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          image: response.data.image,
          price: response.data.price,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        this.setState({errorMsg: "Register please"});
      });
  }

  newProduct() {
    this.setState({
      id: null,
      name: "",
      image: "",
      price: null,

      submitted: false
    });
  }

  render() {
    return (
      <div className="form-container">
        <h4 className="heading-1">Add Product</h4>
        {this.state.errorMsg.length > 0 && <div className='danger'>
            <br />
            <p>{this.state.errorMsg}</p>
          </div> }
          {this.state.successMsg.length > 0 && <div  className='success'>
            <br />
            <p>{this.state.successMsg}</p>
          </div> }
        {this.state.submitted ? (
          <div>
            <h4>New Product Added!</h4>
            <button className="btn btn-success" onClick={this.newProduct}>
              Add
            </button>
          </div>
        ) : (
          <form className="form">
                        
              <div className="formrow">
                  <div className="formcol-1">
                      <div className="formgroup">
                        <label htmlFor="name" className="formlabel">Product Name</label>
                        <input
                          type="text"
                          placeholder="fries"
                          className="forminput"
                          id="name"
                          required
                          value={this.state.name}
                          onChange={this.onChangeName}
                          name="name"
                        />
                      </div>
                      
                      <div className="formgroup">
                        <label htmlFor="image" className="formlabel">Product Image Url</label>
                          <input
                            type="text"
                            placeholder="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                            className="forminput"
                            id="image"
                            required
                            value={this.state.image}
                            onChange={this.onChangeImage}
                            name="image"
                          />
                          
                      </div>

                      <div className="formgroup">
                        <label htmlFor="price" className="formlabel">Product Price</label>
                        <input
                          type="text"
                          placeholder="2000"
                          className="forminput"
                          id="price"
                          required
                          value={this.state.price}
                          onChange={this.onChangePrice}
                          name="price"
                        />
                      </div>
                      
                  </div>
              </div>
            <button onClick={this.saveProduct} className="btn btn-outline btn-bg">
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}