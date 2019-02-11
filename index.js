const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const keys = require("./config/dev");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const itemList = [
  "14225185,14225186,14225188,14225187,39082884,30146244,12662817,34890820,19716431,42391766,35813552,40611708,40611825,36248492,44109840,23117408,35613901,42248076"
];

const url = `http://api.walmartlabs.com/v1/items?ids=${itemList}&apiKey=${
  keys.walmartKey
}`;

app.get("/api", function(req, res) {
  const keyword = req.query.keyword;
  request(url, function(error, response, body) {
    item_found = [];
    const json = JSON.parse(body);
    // res.send(json);
    for (var i = 0; i < json["items"].length; i++) {
      var valid = false;
      if (json["items"][i]["shortDescription"]) {
        var short_des = json["items"][i]["shortDescription"].toLowerCase();
        if (short_des.includes(keyword)) {
          valid = true;
        }
      }

      if (json["items"][i]["longDescription"]) {
        var long_des = json["items"][i]["longDescription"].toLowerCase();
        if (long_des.includes(keyword)) {
          valid = true;
        }
      }

      if (valid) {
        item_found.push(json["items"][i]["itemId"]);
      }
    }
    if (!item_found) {
      res.status(500).send({ keyword: keyword, error: "No item found!" });
    }
    res.send({ keyword: keyword, itemIds: item_found });
  });
});

app.listen(5001, function() {
  console.log("API on port 5001!");
});
