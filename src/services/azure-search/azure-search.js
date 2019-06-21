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
        // "SELECT "+ config.filter1+" AS column1, "+ 
        // config.filter2+" AS column2, "+
        // config.filter3+" AS column3 "+
        // " FROM "+config.databaseTable + " WHERE " + config.searchable1 +' like "%' + req.query.key +
        // '%" or ' + config.searchable2 +' like "%' + req.query.key +'%"',

        "SELECT "+ config.filter1+" AS column1, "+ 
        config.filter2+" AS column2, "+
        config.filter3+" AS column3 "+
        "FROM " +config.databaseTable + " USE INDEX ("+ config.indexName +") WHERE " 
        + config.searchable1 +' like "%' + req.query.key +
        '%" or ' + config.searchable2 +' like "%' + req.query.key +'%"',

        function(err, rows, fields) {
          if (err) {
            res.status(500).render("error.html",{ error: err })
          } else {
          res.status(200).render("results.html", { rows: rows, title: "View Results"});
          }
        }
      );
    });

    this.app.get("/indexes/create", function(req, res) {
      config.connection.query(
        "CREATE INDEX "+ config.indexName +
        " ON "+config.databaseTable + "(" + config.indexColumns +")",
        function(err, rows, fields) {
          if (err) {
            res.status(500).render("error.html",{ error: err })
          } else {
            res.status(200).render("indexes.html", { rows: rows, title:"Create Indexes", msg: "Index Created"});
          }
        }
      );
    });

    this.app.get("/indexes/drop", function(req, res) {
      config.connection.query(
        "DROP INDEX "+ config.indexName +
        " ON "+config.databaseTable,
        function(err, rows, fields) {
          if (err){
            res.status(500).render("error.html",{ error: err })
          } else {
            res.status(200).render("indexes.html", { rows: rows, title: "Drop Indexes", msg: "Index Dropped"});
          }
        }
      );
    });

    this.app.get("/indexes", function(req, res) {
      config.connection.query(
        "SHOW INDEX FROM "+ config.databaseTable,
        function(err, rows, fields) {
          if (err){
            res.status(500).send({ error: err })
          } else {
            res.status(200).render("indexes.html", { rows: rows, title: "View Indexes", msg: "Your current Indexes"});
          }
        }
      );
    });
  }
}

module.exports = AzureSearch;
