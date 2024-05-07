const { Op } = require("sequelize");
const sequelize = require("../config/database.config")

const AppObject = sequelize.models.AppObject;

exports.findOne = async (req, res) => {
    const condition = {};
    if (req.params.key) {
        condition.key = {
            [Op.eq]: req.params.key,
        };
    }
    if (req.query.timestamp) {
        condition.timestamp = {
            [Op.lte]: req.query.timestamp
        }
    }
    await AppObject.findOne({
        where: condition,
        order: [['timestamp', 'DESC']],
    })
    .then((data) => {
        res
        .status(200)
        .send(data ? {value: data.value} : 'Key does not exist');
    })
    .catch((error) => {
        res
        .status(500)
        .send({ message: error.errors ? error.errors[0].message : error.parent.sqlMessage });
    });
};

exports.create = async (req, res) => {
    const payload = req.body;
    
    const keys = Object.keys(payload);
    if (keys.length > 1) {
        res
        .status(422)
        .send('Only one key is allowed');
        return;
    }

    await AppObject.create({
        key: keys[0],
        value: req.body[keys[0]],
        timestamp: Math.floor(new Date().getTime() / 1000),
    }, { fields: ['key', 'value', 'timestamp']})
    .then((data) => {
        res
        .status(200)
        .send(data);
    })
    .catch((error) => {
        res
        .status(req.body.key ? 500 : 422)
        .send({ message: error.errors ? error.errors[0].message : error.parent.sqlMessage  });
    });
}