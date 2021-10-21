const express = require("express");
const router = express.Router();
// Load Product model
const Product = require("../../models/Product");
const Order = require("../../models/Order");
const validateNewProductInput = require("../../validation/newProduct");

// Get all Product
router.get("/", (req, res) => {
  Product.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});
router.post("/remove/:id", (req, res) => {
  Product.deleteOne({ _id: req.params.id }, err => {
    if (err) return res.status(404).json({ delete: "Unsuccessfully " });

    Order.deleteMany({ product: req.params.id }, err => {
      if (err) return res.status(404).json({ delete: "Unsuccessfully " });
      return res.status(200).json({ delete: "Successfully" });
    });
  });
});

router.post("/new", (req, res) => {
  // Form validation
  const { errors, isValid } = validateNewProductInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Product.findOne({ name: req.body.name }).then(product => {
    if (product) {
      return res.status(400).json({ name: "Name already exists" });
    } else {
      const newProduct = new Product({
        name: req.body.name,
        category: req.body.category,
        brand: req.body.brand,
        quantity: req.body.quantity,
        cost: req.body.cost,
        resell: req.body.resell,
      });
      newProduct
        .save()
        .then(product => res.json(product))
        .catch(err => console.log(err));
    }
  });
});

router.post("/update/:id", (req, res) => {
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        resell: req.body.resell,
        cost: req.body.cost,
        quantity: req.body.quantity,
      },
    },
    (err, doc) => {
      if (err) res.send(err);
      else res.send(doc);
    }
  );
});

module.exports = router;
