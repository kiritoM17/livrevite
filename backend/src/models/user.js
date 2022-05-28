'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
    }
  }
  User.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type:DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    typeUser: {
      allowNull: false,
      type:DataTypes.STRING
    },
    structure: {
      allowNull: true,
      type:DataTypes.STRING
    },
    siret: {
      allowNull: true,
      type: DataTypes.STRING
    },
    facturationAdress: {
      allowNull: true,
      type:DataTypes.STRING
    },
    postalCode: {
      allowNull: true,
      type: DataTypes.STRING
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING
    },
    profileImagePath: {
      allowNull: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};