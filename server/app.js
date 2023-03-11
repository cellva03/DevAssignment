const express = require("express");
const app = express();
const mongoose = require("mongoose");
const apiRouter = require("./Routes/apirouter");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(cors());

const dburl = "mongodb://localhost:27017/test";
app.use("/api", apiRouter);
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
