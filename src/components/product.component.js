import React, { Component } from "react";
import ProductDataService from "../services/product.service";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.getProduct = this.getProduct.bind(this);
    // this.updateImage = this.updateImage.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      currentProduct: {
        id: null,
        name: "",
        price: "",
        image: "",
      },
      successMsg: "",
      errorMsg: ""
    };
  }

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  onChangeImage(e) {
    const image = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        image: image
      }
    }));
    if (!this.state.image) {
      this.setState({errorMsg: "Please enter your image"});
    }
    if (this.state.image.length < 10) {
      this.setState({errorMsg: "Minimum length is 10"});
    }
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentProduct: {
          ...prevState.currentProduct,
          name: name
        }
      };
    });

    if (!this.state.name) {
      this.setState({errorMsg: "Please enter your name"});
    }
    if (this.state.name.length < 5) {
      this.setState({errorMsg: "Minimum length is 5"});
    }
  }

  onChangePrice(e) {
    const price = e.target.value;
    
    this.setState(prevState => ({
      currentProduct: {
        ...prevState.currentProduct,
        price: price
      }
    }));
    if (!this.state.price) {
      this.setState({errorMsg: "Please enter your Price"});
    }
  }

  getProduct(id) {
    if(!this.state.errorMsg){
    ProductDataService.get(id)
      .then(response => {
        this.setState({
          currentProduct: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }}

  // updateImage(status) {
  //   var data = {
  //     id: this.state.currentProduct.id,
  //     name: this.state.currentProduct.name,
  //     price: this.state.currentProduct.price,
  //     image: status
  //   };

  //   ProductDataService.update(this.state.currentProduct.id, data)
  //     .then(response => {
  //       this.setState(prevState => ({
  //         currentProduct: {
  //           ...prevState.currentProduct,
  //           image: status
  //         }
  //       }));
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  updateProduct(e) {
    e.preventDefault();
    ProductDataService.update(this.state.currentProduct.id,this.state.currentProduct)
      .then(response => {
        console.log(response);
        this.setState({successMsg: "The product was updated successfully!"});
      })
      .catch(e => {
        this.setState({errorMsg: "Update Failed.. Access denied"});
      });
  }

  deleteProduct(e) { 
    e.preventDefault();   
    ProductDataService.delete(this.state.currentProduct.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/products')
      })
      .catch(e => {
        this.setState({errorMsg: "Delete Failed.. Access denied"});
      });
  }

  render() {
    const { currentProduct } = this.state;

    return (
      <div className="form-container">
        <h4 className="heading-1">Edit Product</h4>
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
                      <label htmlFor="name" className="formlabel">Product Name</label>
                      <input
                        type="text"
                        className="forminput"
                        id="name"
                        value={currentProduct.name}
                        onChange={this.onChangeName}
                      />
                    </div>
                    
                    <div className="formgroup">
                      <label htmlFor="image" className="formlabel">Product Image Url</label>
                      <input
                        type="text"
                        className="forminput"
                        id="image"
                        value={currentProduct.image}
                        onChange={this.onChangeImage}
                      />
                        
                    </div>

                    <div className="formgroup">
                      <label htmlFor="price" className="formlabel">Price</label>
                      <input
                        type="text"
                        className="forminput"
                        id="price"
                        value={currentProduct.price}
                        onChange={this.onChangePrice}
                      />
                    </div>
                    
                </div>
            </div>
            <div className="btn-group">
            <button
                className="btn btn-sm btn-danger"
                onClick={this.deleteProduct}
              >
                Delete
              </button>

              <button
                type="submit"
                className="btn btn-full btn-sm"
                onClick={this.updateProduct}
              >
                Update
              </button>
              </div>
              <p>{this.state.message}</p>
        </form>
      </div>
    );
  }
}