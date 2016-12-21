var mongoose = require('mongoose');
var schema = mongoose.Schema;

var salarySchema = new schema({
    salary: {
        type: Number
    }
}, { collection: 'salaries' });

mongoose.model('Salary', salarySchema);