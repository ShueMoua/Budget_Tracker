module.exports = function (sequelize, DataTypes) {
  const Budget = sequelize.define("Budget",
    {
      amount:
      {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Budget.associate = function (models) {

    Budget.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Budget;
};
