import "whatwg-fetch";

class HttpService {
  getItemId = keyword => {
    var promise = new Promise((resolve, reject) => {
      fetch("http://localhost:3001/api?keyword=" + keyword).then(res => {
        res.json().then(body => {
          resolve(body);
        });
      });
    });
    return promise;
  };
}

export default HttpService;
