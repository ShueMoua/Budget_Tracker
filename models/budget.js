module.exports = function (sequelize, DataTypes) {
  var Budget = sequelize.define("Budget",
    {
      amount:
      {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Budget.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Budget.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Budget;
};
