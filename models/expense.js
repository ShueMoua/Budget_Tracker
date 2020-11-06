module.exports = function (sequelize, DataTypes) {
  const Expense = sequelize.define("Expense",
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

    Expense.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Expense;
};