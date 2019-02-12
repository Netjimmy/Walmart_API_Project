const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const keys = require("./config/dev");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const itemList = [
  "14225185,14225186,14225188,14225187,39082884,30146244,12662817,34890820,19716431,42391766,35813552,40611708,40611825,36248492,44109840,23117408,35613901,42248076"
];

const url = `http://api.walmartlabs.com/v1/items?ids=${itemList}&apiKey=${
  keys.walmartKey
}`;

app.get("/api", function(req, res) {
  const keyword = req.query.keyword.toLowerCase();
  request(url, function(error, response, body) {
    const jsonObject = JSON.parse(body);

    item_found = jsonObject.items
      .filter(
        item =>
          (item.shortDescription &&
            item.shortDescription.toLowerCase().includes(keyword)) ||
          (item.longDescription &&
            item.longDescription.toLowerCase().includes(keyword))
      )
      .map(item => ({
        itemId: item.itemId,
        name: item.name,
        price: item.salePrice,
        imgUrl: item.mediumImage,
        webUrl: item.productUrl
      }));

    if (item_found.length === 0) {
      res.status(500).send({ keyword: keyword, error: "No item found!" });
    } else {
      res.send({ keyword: keyword, itemIds: item_found });
    }
  });
});

app.listen(5001, function() {
  console.log("API on port 5001!");
});
