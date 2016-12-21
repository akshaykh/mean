var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: [ true, 'last name is required field akshay']
     },
    employeeNumber: {
        type: Number,
        required: true
    },
    dateOfJoining: {
        type: Date
    },
    salary: {
        type: Schema.Types.ObjectId,
        ref:'Salary'
    }
});

mongoose.model('Employee', employeeSchema);
