const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public"))); // telling express it is using pub files to manipulate DOM

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

const port = 4000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
