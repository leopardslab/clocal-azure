"use strict";
 
function has_required_params(req) {
    return false;
}
 
module.exports.has_required_params = has_required_params;
function has_required_params(req) {
    return Boolean(req.query.year) 
        && Boolean(req.query.month)
        && Boolean(req.query.day);
}
 
module.exports.has_required_params = has_required_params;
