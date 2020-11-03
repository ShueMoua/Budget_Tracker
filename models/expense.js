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

    Expense.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Expense.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Expense;
  };