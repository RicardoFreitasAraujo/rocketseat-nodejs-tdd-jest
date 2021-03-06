const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
    }, {
        hooks: {
            beforeSave: async (user) => {
                if (user.password) {
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        }
    });

    User.prototype.checkPassword = function() {
        return bcrypt.compare(password, this.password_hash);
    }

    return User;
};