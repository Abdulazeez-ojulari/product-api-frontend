import http from "../http-settings";

class UserDataService {

  login(data) {
    return http.post('/auth', data);
  }

  register(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/products/${id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }
}

export default new UserDataService();