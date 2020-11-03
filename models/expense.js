module.exports = function(sequelize, DataTypes) {
    var Expense = sequelize.define("Expense", {
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      day: {
        type: DataTypes.DATE,
        allowNull: false
      }}, 
      {
      freezeTableName: true}
    );
    return Expense;
  };