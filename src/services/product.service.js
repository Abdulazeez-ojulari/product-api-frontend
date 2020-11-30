import http from "../http-settings";

class ProductDataService {
  getAll() {
    return http.get("/products");
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post("/products", data,{headers:{'xauthtoken':localStorage.getItem('token')}});
  }

  update(id, data) {
    return http.put(`/products/${id}`, data,{headers:{'xauthtoken':localStorage.getItem('token')}});
  }

  delete(id) {
    return http.delete(`/products/${id}`,{headers:{'xauthtoken':localStorage.getItem('token')}});
  }

  deleteAll() {
    return http.delete(`/products`,{headers:{'xauthtoken':localStorage.getItem('token')}});
  }

  findByName(name) {
    return http.get(`/products?name=${name}`);
  }
}

export default new ProductDataService();