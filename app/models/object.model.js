const validatorMsg = require('../validators/message.validator');

const AppObject = (sequelize, DataTypes) => {
    sequelize.define('AppObject', {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: validatorMsg.requiredMsg({ field: 'Key' })
                },
                notEmpty: {
                    msg: validatorMsg.requiredMsg({ field: 'Key' })
                }
                // isEven(value) {
                //     validatorRule.isEven({ value: value, field: 'firstName' })
                // },  // <--- this is how to use custom validator
            }
        },
        value: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: validatorMsg.requiredMsg({ field: 'Value' })
                },
                notEmpty: {
                    msg: validatorMsg.requiredMsg({ field: 'Value' })
                }
            }
        },
        timestamp: {
            type: DataTypes.INTEGER,
          },
    }, {
        timestamps: false,
    });
};

module.exports = AppObject;