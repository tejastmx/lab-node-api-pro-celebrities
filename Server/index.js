const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var celebrities = require("../controller/celebController");

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.listen(3000, () => {
  console.log("server started on port 3000");
});

app.use("/celebrities", celebrities);
