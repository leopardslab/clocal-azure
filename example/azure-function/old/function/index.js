module.exports = function (req, res) {
    if (req.query.name || (req.body && req.body.name)) {
        res.send ({
            // status: 200, /* Defaults to 200 */
            body: "Hello PATH" + (req.query.name || req.body.name)
        });
      }
      else {
        res.send ({
            status: 400,
            body: "Please pass a name on the query string or in the request body"
    });
    }
    
};