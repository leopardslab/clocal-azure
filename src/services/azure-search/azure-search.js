"use strict";

const CloudLocal = require("./../azure/cloud-local");
const express = require("express");

let config = require("./config");

class AzureSearch extends CloudLocal {
  init() {
    this.app.set("views", __dirname + "/views");
    this.app.use(express.static(__dirname + "/img"));
    this.app.use(express.static(__dirname + "/css"));
    this.app.set("view engine", "ejs");
    this.app.engine("html", require("ejs").renderFile);

    this.port = config.servicePort;
    this.app.get("/", (req, res) => {
      res.render("index.html");
    });

    this.app.get("/search", function(req, res) {
      config.connection.query(
        "SELECT "+ config.column1+" AS column1, "+ 
        config.column2+" AS column2, "+
        config.column3+" AS column3 "+
        " FROM "+config.databaseTable + " WHERE " + config.searchValue1 +' like "%' + req.query.key +
        '%" or ' + config.searchValue2 +' like "%' + req.query.key +'%"',
        function(err, rows, fields) {
          if (err) throw err;
          res.render("results.html", { rows: rows });
        }
      );
    });
  }
}

module.exports = AzureSearch;
