I have first written the code in wrapper.js

run this on terminal 

    npm test 

download ava.js 
 
    npm install --save-dev ava@next

Edit the package.json to run the AVA tests: `”test”: “ava”`

Set path of tests in package.json in AVA to find the tests:

    "ava": {
    "files": ["test_*.js"]
    }
    
Add some simple test code. 
These parameters will be in the Azure Functions request object:

    import sleeps from "./wrapper.js";
 
    test("Request has required parameters", 
    function (t) {
        const req = { "query" : {}};
        t.false(sleeps.has_required_params(req));
    });
   
Now you just need to add test cases until you get the coverage

for eg.

    test("Request has required parameters", 
        function (t) {
        const req = { "query" : {}};
        t.false(sleeps.has_required_params(req));
 
        req.query = {"year": "1234"};
        t.false(sleeps.has_required_params(req));
 
        req.query = {
            "year": "1234",
            "month" : "56",
            "day": "78"};
        t.true(sleeps.has_required_params(req));        
 
    });
    
import sleeps from "./wrapper.js";
 
...
 
    if (sleeps.has_required_params(req)) {
        const target = moment({year: req.query.year,
            month: (parseInt(req.query.month) - 1), // JS Dates are zero indexed!!!
            day: req.query.day });
 
...

now just git push on terminal
add this on azure function file

     const sleeps = require("./sleeps.js
     
<h1>Conclusion</h1>

We’ve created a unit test for azure functions and you can test it by adding any test module.




    
