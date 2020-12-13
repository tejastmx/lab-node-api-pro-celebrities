const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Celeb } = require("../model/Celeb");

//getting all data

router.get("/", (req, res) => {
  Celeb.find((err, celebrity) => {
    if (!err) {
      res.send(celebrity);
    } else {
      res
        .status(404)
        .json({
          error: "Not able to fetch the data! Try again after some time",
        });
    }
  });
});

//get data of specified id

router.get("/:id", (req, res) => {
  //checking if id is valid or not

  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(404)
      .json({ error: "The celebrity with the specified ID does not exist." });
  } else {
    Celeb.findOne({ _id: req.params.id }, (err, celebrity) => {
      if (err) {
        res
          .status(404)
          .json({
            error: "Not able to fetch the data! Try again after some time",
          });
      } else {
        res.send(celebrity);
      }
    });
  }
});

router.post("/", (req, res) => {
  //checking name is empty or not

  if (req.body.name == "") {
    res.status(404).json({ error: "Please provide name for the Celebrity" });
  } else {
    const celeb = new Celeb({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
    });
    //saving data if correct
    celeb.save((err, celebrity) => {
      if (err) {
        res
          .status(404)
          .json({
            errorMessage:
              "There was an error while saving the celebrity to the database",
          });
      } else {
        res.status(200).json({ success: celebrity });
      }
    });
  }
});

router.put("/:id/edit", (req, res) => {
  //checking if id is valid or not

  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(404)
      .json({ error: "The celebrity with the specified ID does not exist." });
  }

  //checking name is empty or not
  else if (req.body.name == "") {
    res.status(404).json({ error: "Please provide name for the Celebrity" });
  }

  //updating data
  else {
    var celeb = {
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase
    };

    Celeb.updateOne({ _id: req.params.id }, celeb, (err, celebrity) => {
      if (err) {
        res
          .status(404)
          .json({ error: "Some error occured ! please try after some time" });
      } else {
        res.redirect(`/celebrities`);
      }
    });
  }
});

router.delete("/:id/delete", (req, res) => {
  //checking if id is valid or not

  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(404)
      .json({ error: "The celebrity with the specified ID does not exist." });
  }

  //if id foud deleting the data
  else {
    Celeb.deleteOne({ _id: req.params.id }, (err, celeb) => {
      if (err) {
        res
          .status(404)
          .json({ error: "Some error occured ! please try after some time" });
      } else {
        res.send(`Celebrity with ${req.params.id} is deleted`);
      }
    });
  }
});

module.exports = router;
