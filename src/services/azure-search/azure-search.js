"use strict";

const CloudLocal = require("./../azure/cloud-local");
const express = require("express");

let config = require("./config");

class AzureSearch extends CloudLocal {
  init() {
    if (process.argv[2] == "search-start") {
      let sql = require("./sql-connect");
      let nosql = require("./nosql-connect");

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
                .render("sqlresults.html", { rows: rows, 
                  title: "Searched Results",
                  msg: ""
                });
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
            config.indexSQLColumns +
            ")",
          function(err, rows, fields) {
            if (err) {
              res.status(500).render("error.html", { error: err });
            } else {
              res.status(200).render("sqlresults.html", {
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
              res.status(200).render("sqlresults.html", {
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
              res.status(500).render("error.html", { error: err });
            } else {
              res.status(200).render("sqlresults.html", {
                rows: rows,
                title: "View Indexes",
                msg: "Your current Indexes"
              });
            }
          }
        );
      });

      this.app.get("/sql/count", function(req, res) {
        let top = parseInt(req.query.top);
        let skip = parseInt(req.query.skip);
        let orderby = req.query.orderby;
        let query;

        if (top !== top && skip !== skip && orderby == undefined) {
          sql.connection.query(
            "SELECT * FROM " + config.databaseTable,
            function(err, rows, fields) {
              if (err) {
                res.status(500).render("error.html", { error: err });
              } else {
                res.status(200).render("sqlresults.html", {
                  rows: rows,
                  title: "SQL Data",
                  msg: "Your current data"
                });
              }
            }
          );
        } else {
          if (top !== top && skip !== skip) {
            query = "SELECT * FROM " + config.databaseTable + " ORDER BY " + orderby;
          }

          else if (skip !== skip && orderby == undefined) {
            query = "SELECT * FROM " + config.databaseTable + " LIMIT " + top;
      
          } else if (skip !== skip) {
            query = "SELECT * FROM " + config.databaseTable + " ORDER BY " + orderby +
              " LIMIT " + top;
          
          } else if (orderby == undefined) {
            query = "SELECT * FROM " + config.databaseTable + " LIMIT " +
              skip + "," + top;

          } else {
            query = "SELECT * FROM " + config.databaseTable + " ORDER BY " + orderby +
              " LIMIT " + skip + "," + top;
          }
          sql.connection.query(query, function(err, rows, fields) {
            if (err) {
              res.status(500).render("error.html", { error: err });
            } else {
              res.status(200).render("sqlresults.html", {
                rows: rows,
                title: "SQL Data",
                msg: "Your current data"
              });
            }
          });
        }
      });

      // NOSQL

      this.app.get("/nosql", function(req, res) {
        res.render("nosqlhome.html");
      });

      this.app.get("/nosql/search", function(req, res) {
        var token = new RegExp(req.query.key);
        var query = {
          $or: [
            { [config.filter1]: token },
            { [config.filter2]: token },
            { [config.filter3]: token },
            { [config.filter4]: token },
            { [config.filter5]: token }
          ]
        };

        nosql.find(query, function(err, rows) {
          if (err) {
            res.status(500).render("error.html", {
              error: true,
              message: "Error fetching data"
            });
          } else {
            res.status(200).render("nosqlresults.html", {
              rows: rows,
              title: "NoSQL Data",
              msg: "Your current data"
            });
          }
        });
      });


      this.app.get("/nosql/indexes/create", function(req, res) {
          let collection = nosql.db.collection(config.databaseName);
          // Create the index
          collection.createIndex(
            config.indexNoSQLColumns, {unique: true}, function(err, rows) {
            if (err){
              res.status(500).render("error.html", { error: err });
            } else {
              res.status(200).render("nosqlresults.html", {
                rows: rows,
                title: "Create Indexes",
                msg: "Index Created"
              });
            }
          });
      });

      this.app.get("/nosql/indexes/drop", function(req, res) {
        let collection = nosql.db.collection(config.databaseName);
        collection.dropIndex(
          config.indexNoSQLColumns, function(err, rows) {
          if (err){
            res.status(500).render("error.html", { error: err });
          } else {
            res.status(200).render("nosqlresults.html", {
              rows: rows,
              title: "Drop Indexes",
              msg: "Index Dropped"
            });
          }
        });
      });

      this.app.get("/nosql/indexes", function(req, res) {
        let collection = nosql.db.collection(config.databaseName);
        collection.getIndexes(
          config.indexNoSQLColumns, function(err, rows) {
          if (err){
            res.status(500).render("error.html", { error: err });
          } else {
            res.status(200).render("nosqlresults.html", {
              rows: rows,
              title: "View Indexes",
              msg: "Your current Indexes"
            });
          }
        });
      });

      this.app.get("/nosql/count", function(req, res) {
        let top = parseInt(req.query.top);
        let skip = parseInt(req.query.skip);
        let orderby = req.query.orderby;

        let query = {};
        let response;
        if (top < 0 || top === 0) {
          response = {
            error: true,
            message: "Invalid top number, should start with 1"
          };
          return res.json(response);
        }
        query.skip = skip;
        query.limit = top;
        query.sort = { [orderby]: 1 };

        nosql.find({}, {}, query, function(err, rows) {
          if (err) {
            // response = { error: true, message: "Error fetching data" };
            res.status(500).render("error.html", {
              error: true,
              message: "Error fetching data"
            });
          } else {
            // response = { error: false, message: data };
            res.status(200).render("nosqlresults.html", {
              rows: rows,
              title: "NoSQL Data",
              msg: "Your current data"
            });
          }
          // res.json(response);
        });
      });
    }
  }
}

module.exports = AzureSearch;
