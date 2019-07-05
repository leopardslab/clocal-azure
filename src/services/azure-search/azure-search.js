"use strict";

const CloudLocal = require("./../azure/cloud-local");
const express = require("express");

let config = require("./config");
let nosql = require("./nosql-connect");
let sql = require("./sql-connect");

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

    this.app.get("/sql", function(req, res) {
      res.render("sqlhome.html");
    });

    this.app.get("/sql/search", function(req, res) {
      sql.connection.query(
        // "SELECT "+ config.filter1+" AS column1, "+
        // config.filter2+" AS column2, "+
        // config.filter3+" AS column3 "+
        // " FROM "+config.databaseTable + " WHERE " + config.searchable1 +' like "%' + req.query.key +
        // '%" or ' + config.searchable2 +' like "%' + req.query.key +'%"',

        "SELECT " +
          config.filter1 +
          " AS column1, " +
          config.filter2 +
          " AS column2, " +
          config.filter3 +
          " AS column3 " +
          "FROM " +
          config.databaseTable +
          " USE INDEX (" +
          config.indexName +
          ") WHERE " +
          config.searchable1 +
          ' like "%' +
          req.query.key +
          '%" or ' +
          config.searchable2 +
          ' like "%' +
          req.query.key +
          '%"',

        function(err, rows, fields) {
          if (err) {
            res.status(500).render("error.html", { error: err });
          } else {
            res
              .status(200)
              .render("results.html", { rows: rows, title: "View Results" });
          }
        }
      );
    });

    this.app.get("/sql/indexes/create", function(req, res) {
      sql.connection.query(
        "CREATE INDEX " +
          config.indexName +
          " ON " +
          config.databaseTable +
          "(" +
          config.indexColumns +
          ")",
        function(err, rows, fields) {
          if (err) {
            res.status(500).render("error.html", { error: err });
          } else {
            res.status(200).render("indexes.html", {
              rows: rows,
              title: "Create Indexes",
              msg: "Index Created"
            });
          }
        }
      );
    });

    this.app.get("/sql/indexes/drop", function(req, res) {
      sql.connection.query(
        "DROP INDEX " + config.indexName + " ON " + config.databaseTable,
        function(err, rows, fields) {
          if (err) {
            res.status(500).render("error.html", { error: err });
          } else {
            res.status(200).render("indexes.html", {
              rows: rows,
              title: "Drop Indexes",
              msg: "Index Dropped"
            });
          }
        }
      );
    });

    this.app.get("/sql/indexes", function(req, res) {
      sql.connection.query(
        "SHOW INDEX FROM " + config.databaseTable,
        function(err, rows, fields) {
          if (err) {
            res.status(500).send({ error: err });
          } else {
            res.status(200).render("indexes.html", {
              rows: rows,
              title: "View Indexes",
              msg: "Your current Indexes"
            });
          }
        }
      );
    });

    // NOSQL

    this.app.get("/nosql", function(req, res) {
      res.render("nosqlhome.html");
    });

    this.app.get("/nosql/search", function(req, res) {});

    this.app.get("/nosql/explore", function(req, res) {
      var pageNo = parseInt(req.query.pageNo);
      var size = parseInt(req.query.size);
      var query = {};
      let response;
      if (pageNo < 0 || pageNo === 0) {
        response = {
          error: true,
          message: "invalid page number, should start with 1"
        };
        return res.json(response);
      }
      query.skip = size * (pageNo - 1);
      query.limit = size;

      nosql.find({}, {}, query, function(err, data) {
        if (err) {
          response = { error: true, message: "Error fetching data" };
        } else {
          response = { error: false, message: data };
        }
        res.json(response);
      });
    });
  }
}

module.exports = AzureSearch;
