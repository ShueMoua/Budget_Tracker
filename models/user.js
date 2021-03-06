const bcrypt = require("bcryptjs");
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.associate = function(models) {

    User.hasMany(models.Income, {
      onDelete: "cascade"
    });

    User.hasMany(models.Expense, {
      onDelete: "cascade"
    });

    User.hasMany(models.Budget, {
      onDelete: "cascade"
    });
  };  

  return User;
};
