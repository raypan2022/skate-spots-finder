const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("could not find this route.", 404);
  next(error);
});

// set up error handling
// only executed for requests with error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error has occured" });
});

mongoose
  .connect(`mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.fmsfmtp.mongodb.net/${process.env.NAME}?retryWrites=true&w=majority`)
  .then(() => app.listen(8000))
  .catch((err) => console.log(err));
