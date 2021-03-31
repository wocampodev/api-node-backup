

const MDjwt = require("../middlewares/validate-jwt");
const MDresults = require("../middlewares/validate-fields");
const MDroles = require("../middlewares/validate-roles");


module.exports = {
    ...MDjwt,
    ...MDresults,
    ...MDroles,
};