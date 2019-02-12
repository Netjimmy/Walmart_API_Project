import "whatwg-fetch";

class HttpService {
  getData = keyword => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:5001/api?keyword=" + keyword)
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
