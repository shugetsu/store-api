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
    openid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'openid'
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
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
