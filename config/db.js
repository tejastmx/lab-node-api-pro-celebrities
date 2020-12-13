const mongoose = require("mongoose");
const password = "root";
const dbname = "ProCelebraties";

mongoose
  .connect(
    `mongodb+srv://ProCelebraties:${password}@cluster0.bvlh1.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((ok) => console.log("connected to mongodb"))
  .catch((err) => console.log("error connecting to mongodb"));

module.exports = mongoose;
