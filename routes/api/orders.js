const express = require("express");
const router = express.Router();
// Load order model
const Order = require("../../models/Order");
const Product = require("../../models/Product");
// Get all order
// Must have product detail only return else delete order

router.get("/", (req, res) => {
  Order.aggregate(
    [
      {
        $lookup: {
          from: Product.collection.name,
          localField: "product",
          foreignField: "_id",
          as: "productdetail",
        },
      },
    ],
    function (err, order) {
      if (err) return res.send(err);
      res.json(order);
    }
  );
});

// Approve :id = order id
router.post("/approve/", (req, res) => {
  Order.deleteOne({ _id: req.body.id }, err => {
    if (err) return res.status(404).json({ delete: "Unsuccessfully " });
  });
  Product.findOne({ _id: req.body.product }).then(product => {
    const newAmount = product.quantity - req.body.amount;
    if (newAmount < 0) {
      return res
        .status(404)
        .json({ approve: "Unsuccessfully due to limited stock." });
    }

    Product.updateOne(
      { _id: req.body.product },
      {
        $set: {
          quantity: newAmount,
        },
      },
      (err, doc) => {
        if (err) res.send(err);
        else {
          res.send(doc);
        }
      }
    );
  });
});

// Remove
router.post("/remove/:id", (req, res) => {
  Order.deleteOne({ _id: req.params.id }, err => {
    if (err) return res.status(404).json({ delete: "Unsuccessfully " });

    return res.status(200).json({ delete: "Successfully" });
  });
});

// Create new order
router.post("/new", (req, res) => {
  console.log("new");
  const newOrder = new Order({
    reseller: req.body.reseller,
    product: req.body.product,
    amount: req.body.amount,
  });
  newOrder
    .save()
    .then(order => res.json(order))
    .catch(err => console.log(err));
});

module.exports = router;
