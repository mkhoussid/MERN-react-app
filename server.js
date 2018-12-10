const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

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

app.get("/", (req, res) => res.send("Hello World!"));

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    `\n\nSUCCESS:\n***************\nServer running on port ${port} \n***************\n\n`
  )
);
