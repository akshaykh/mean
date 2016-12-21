var config = require('../config/development/development');
var mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    require('../model/Employee');
    require('../model/Salary');
    require('../model/User');

    return db;
};