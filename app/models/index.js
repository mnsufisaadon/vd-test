const { DataTypes } = require('sequelize');

const sequelize = require('../config/database.config');
const AppObject = require('./object.model')(sequelize, DataTypes);

//sync all the models
const models = () => {
    AppObject;
}

module.exports = models;