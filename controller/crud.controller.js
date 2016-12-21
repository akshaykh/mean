var mongoose = require('mongoose');
var emp = mongoose.model('Employee');
var events = require('events');
var em = new events.EventEmitter();
var User = mongoose.model('User');
//var employeeNumber = "";
var passport = require('passport');
/* Controller file for handling CRUD */

var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

exports.create = function (req, res, next) {
    console.log('Create Method');
 
    var employ = new emp(req.body);
    console.log(employ);
    employ.save(function (err) {
        if (err)
            res.send(err);
        else
        res.json(employ);
    });
   // res.send('Create');
};

exports.read = function (req, res, next) {
   // var sess = req.session;
    var empNo = req.params.empNo;// sess.empNumber;
    console.log('Read Method with empNo'+empNo);
   
    emp.find({ employeeNumber: empNo }, function (err, emps) {
       // res.write("success");
           res.json(emps);
    });
   /* if (1 == 1) {
        throw {
            name: "custom error",
            message: " this is custom"
        };
    }*/
    //res.send('Read');
};

exports.update = function (req, res, next) {
    console.log('Update Method');
    var employ = new emp(req.body);
    console.log(employ);
    emp.update({ employeeNumber: employ.employeeNumber }, {
        $set: {
            firstName: employ.firstName,
            lastName: employ.lastName
        }
    },
        {},
        function (err, raw) {
            console.log(err);
        });
    res.json(employ);
};

exports.getSalary = function (req, res, next) {
    var sess = req.session;
    var emps;
    
    emp.find({ employeeNumber: req.params['empNo'] }).exec(function (err, data) {
        console.log(data);
        emps = data;
        
    });

    emps.populate('salary').exec(function (err, data) {
        res.json(data[0].salary.salary);
    });
};

exports.delete = function (req, res, next) {
    console.log('Delete Method');
    var employ = new emp(req.body);
    console.log(employ);
    emp.remove({ employeeNumber: employ.employeeNumber }, function (err) {
        console.log(err);
    });
    res.send("done");
};

exports.getEmployeeById = function (req, res, next, employeeId) {
    console.log("employee id :" + employeeId);
    var sess = req.session;
    sess.empNumber = employeeId;
    console.log("Employee Number:" + sess.empNumber);
    next();
};

exports.getEmpList = function (req, res, next) {
    emp.find({}, 'firstName lastName employeeNumber', function (err, emps) {
        res.json(emps);
    });

};

exports.chain1 = function (req, res, next) {
    console.log('chain 1');
    next();
}

exports.chain2 = function (req, res, next) {
    console.log('chain 2');
    next();
}

exports.parametercheck = function (req, res, next) {
    console.log("method start");
    console.log(req.param('paramName'));
    console.log(req.param('name'));
    res.send(req.param('name'));
};

var eventHandler = function (req, res, next) {
    //res.send('event handled');
    console.log('event getting handled');
};

em.on('myEvent', eventHandler);

exports.eventException = function(req, res, next) {
    em.emit('myEvent');
    console.log('event exception');
    res.send('akshay event thrown');
};


exports.signin = function (req, res, next) {
    var user = new User(req.body);

    req.login(user, function (err) {
        if (err) {
            console.log(err);
            res.send("we fail");
        }
        else {
            console.log(req.isAuthenticated());
           // res.redirect('homepage');
            var sess = req.session;
            sess.logindone = true;
            res.send(true);
        }
    });
};

exports.signup = function (req, res, next) {
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';

        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);
            }
            req.login(user, function (err) {
                if (err) return next(err);
                
            });
        });
   
};

exports.isLoggedIn = function (req, res, next) {
    console.log(req.isAuthenticated());
    if (true) {
        next();
    }
    else {
        res.send("You must logged in first");
    }
};

exports.renderHomePage = function (req, res, next) {

    res.render('homepage');
};

exports.renderSignUp = function (req, res, next) {
    res.render('signup');
};

exports.renderLogin = function (req, res, next) {
    res.render('signin');
};

exports.renderInsert = function (req, res, next) {
    res.render('insert');
};

exports.renderDataTable = function (req, res, next) {
    res.render('dataTable');
}
