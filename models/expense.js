module.exports = function (sequelize, DataTypes) {
  var Expense = sequelize.define("Expense",
    {
      amount:
      {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      description:
      {
        type: DataTypes.STRING,
        allowNull: false
      },
      day:
      {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Expense.associate = function (models) {
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