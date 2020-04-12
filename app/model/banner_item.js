/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('bannerItem', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    imgId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'img_id'
    },
    bannerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'banner_id'
    },
    keyWord: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'key_word'
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1',
      field: 'type'
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
    tableName: 'banner_item',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {
    app.model.BannerItem.belongsTo(app.model.Image, {
      foreignKey: 'imgId',
      sourceKey: 'id'
    })
  }

  return Model
}
