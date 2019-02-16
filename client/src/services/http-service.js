import "whatwg-fetch";
import axios from "axios";

let instance = null;
class HttpService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  getData = keyword => {
    const promise = new Promise((resolve, reject) => {
      // fetch("http://localhost:5000/search?keyword=" + keyword)
      axios
        .get("/api/search?keyword=" + keyword)
        .then(response => {
          // console.log(response.data);
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
    return promise;
  };
}

export default HttpService;
