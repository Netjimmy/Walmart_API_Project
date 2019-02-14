import "whatwg-fetch";

let instance = null;
class HttpService {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }
  getData = keyword => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:5000?keyword=" + keyword)
        .then(response => {
          resolve(response.json());
        })
        .catch(error => {
          console.log(error);
        });
    });
    return promise;
  };
}

export default HttpService;
