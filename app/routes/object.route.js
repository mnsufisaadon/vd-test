const objectController = require("../controllers/object.controller");

const route = (app) => {

    app.get('/object/:key', objectController.findOne);
    app.post('/object', objectController.create);
};

module.exports = route;