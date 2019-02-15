const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const request = require("request");
const keys = require("./config/dev");

// The mongodb schema
const Item = require("./model/item");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true
});

let itemList = "";

// The api page
// Code
// 200        successful operation
app.get("/api", function(req, res) {
  res.send("This is a Walmart keyword search API!");
});

// Fetch items from database
// Code
// 200        successful operation
// 500        internal connection error
app.get("/api/item", function(req, res) {
  Item.find({}, function(err, items) {
    if (err) {
      res.status(500).send({ err: "Could not fetch item" });
    } else {
      res.send(items);
    }
  });
});

// Update items to database
// Parameter:
// ItemId: the id of each item
// Code:
// 200        successful operation
// 500        internal connection error
app.post("/api/item", function(req, res) {
  const item = new Item(req.body);
  item.save(function(err, savedItem) {
    if (err) {
      res.status(500).send({ error: "Could not save product" });
    } else {
      res.send(savedItem);
    }
  });
});

// Search items by keyword
// Parameter:
// Keyword: the input keyword
// Code:
// 200        successful operation
// 400        invalid input
app.get("/api/search", function(req, res) {
  const url = `http://api.walmartlabs.com/v1/items?ids=${itemList}&apiKey=${
    keys.walmartKey
  }`;
  if (!req.query.keyword) {
    res.status(400).send({ error: "Please enter keyword" });
  } else {
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
      res.send({ keyword: keyword, itemIds: item_found });
    });
  }
});

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the routes
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, async function() {
  await Item.find({}, function(err, items) {
    if (err) {
      res.status(500).send({ error: "Could not load data from database" });
    } else {
      items.forEach(function(ele) {
        itemList += ele.itemId + ",";
      });
      itemList = itemList.slice(0, -1);
    }
  });
});
