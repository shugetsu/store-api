/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('banner', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'name'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'description'
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
    tableName: 'banner',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {
    app.model.Banner.hasMany(app.model.BannerItem, {
      foreignKey: 'bannerId',
      sourceKey: 'id'
    })
  }

  return Model
}
