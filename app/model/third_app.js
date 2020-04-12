/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('thirdApp', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    appId: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'app_id'
    },
    appSecret: {
      type: DataTypes.STRING(64),
      allowNull: false,
      field: 'app_secret'
    },
    appDescription: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'app_description'
    },
    scope: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'scope'
    },
    scopeDescription: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'scope_description'
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
    tableName: 'third_app',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {

  }

  return Model
}
