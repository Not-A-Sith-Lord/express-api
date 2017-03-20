const express = require('express');
const router = express.Router();
const Phone = require('../models/phone-model');
const mongoose = require('mongoose');

router.get('/phones', (req, res, next) => {
  Phone.find((err, phonesList) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(phonesList);
  });
});


router.post("/phones", (req, res, next) => {

  const thePhone = new Phone ({
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  });

  thePhone.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "new phone created!",
      id: thePhone._id
    })
  });

});

router.get("/phones/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: "specified id is not valid"});
      return;
  }

  Phone.findById(req.params.id, (err, thePhone) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(thePhone);
  });
});

router.put('/phones/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: 'Specified id is not valid'});
    return;
  }

  const updates = {
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  };

  Phone.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: "Phone updated sucessfully"
    });
  });
});

router.delete('/phones/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: "Specified id is not valid"});
    return;
  }

  res.json({
    message: "Phone has been removed"
  });
});


module.exports = router;