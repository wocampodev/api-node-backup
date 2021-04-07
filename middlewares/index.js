

const MDfile = require("../middlewares/validate-file");
const MDjwt = require("../middlewares/validate-jwt");
const MDresults = require("../middlewares/validate-fields");
const MDroles = require("../middlewares/validate-roles");


module.exports = {
    ...MDfile,
    ...MDjwt,
    ...MDresults,
    ...MDroles,
};