/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('image', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'url',
      get() {
        // 如果图片来源是本地的话 则添加域名前缀
        if (this.getDataValue('from') === 1) {
          return app.config.imagePrefixPath + this.getDataValue('url')
        }
        return this.getDataValue('url')
      }
    },
    from: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1',
      field: 'from'
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
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'deleted_at'
    }
  }, {
    tableName: 'image',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {

  }

  return Model
}
