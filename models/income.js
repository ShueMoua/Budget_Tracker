module.exports = function (sequelize, DataTypes) {
  const Income = sequelize.define("Income",
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
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Income.associate = function (models) {

    Income.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Income;
};
