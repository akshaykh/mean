var controller = require('../controller/crud.controller');

/* Router to map route with url */

module.exports = function (app) {
    app.route('/homepage').get(controller.renderHomePage);
    app.route('/insert').get(controller.renderInsert);
    app.route('/dataTable').get(controller.renderDataTable);
    app.route('/signup').get(controller.renderSignUp);
    app.route('/login').get(controller.renderLogin);
    app.route('/create').post(controller.isLoggedIn);
    app.route('/create').post(controller.create);
    app.route('/read/:empNo').get(controller.read);
    app.route('/update').post(controller.update);
    app.route('/delete').post(controller.delete);
    app.route('/salary/:empNo').get(controller.getSalary);
    app.route('/empList').get(controller.getEmpList);
    app.route('/chain').get([controller.chain1, controller.chain2]);
    app.route('/reqparameter/:paramName').get(controller.parametercheck);
    app.route('/eventHandle').get(controller.eventException);
    app.route('/signin').post(controller.signin);
    app.route('/signup').post(controller.signup);
    


   /* app.use(function (err, req, res, next) {
        console.log('error handler');
        res.write('error handled');
        res.end();
      //  res.send(err);
    });*/

  //  app.param('empNo', controller.getEmployeeById);

};