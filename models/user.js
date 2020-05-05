'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING(500)
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};