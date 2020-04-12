/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    unionid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'unionid'
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'nickname'
    },
    extend: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'extend'
    },
    deleteAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'delete_at'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  }, {
    tableName: 'user',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {

  }

  return Model
}
