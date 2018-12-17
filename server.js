const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/keys.js").mongoURI;
//db connection
mongoose
  .connect(db)
  .then(() =>
    console.log(
      "\n\nSUCCESS:\n***************\nMongoDB connected" +
        "\n***************\n\n"
    )
  )
  .catch(err =>
    console.log(
      "\n\nERROR ENCOUNTERED:\n***************\n" +
        err +
        "\n***************\n\n"
    )
  );

//Passport middleware
app.use(passport.initialize());

//Passport Config
require("./config/passport")(passport);

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

//serve static assets
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `\n\nSUCCESS:\n***************\nServer running on port ${port} \n***************\n\n`
  )
);
