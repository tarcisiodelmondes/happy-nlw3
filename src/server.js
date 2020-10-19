const express = require("express");
const path = require("path");
const pages = require("./pages.js");

const server = express();

server
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "hbs")
  .get("/", pages.index)
  .get("/orphanage", pages.orphanage)
  .get("/orphanages", pages.orphanages)
  .get("/create-orphanage", pages.createOrphanages)
  .post("/save-orphanage", pages.saveOrphanage);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
server.listen(port);
