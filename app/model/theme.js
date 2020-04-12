/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('theme', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'name'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'description'
    },
    topicImgId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'topic_img_id'
    },
    headImgId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'head_img_id'
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
    tableName: 'theme',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {
    app.model.Theme.belongsTo(app.model.Image, {
      foreignKey: 'topicImgId',
      sourceKey: 'id',
      as: 'topicImage'
    })
    app.model.Theme.belongsTo(app.model.Image, {
      foreignKey: 'headImgId',
      sourceKey: 'id',
      as: 'headImage'
    })
    app.model.Theme.belongsToMany(app.model.Product, {
      through: app.model.ThemeProduct,
      foreignKey: 'themeId'
    })
    app.model.Product.belongsToMany(app.model.Theme, {
      through: app.model.ThemeProduct,
      foreignKey: 'productId'
    })
  }
  return Model
}
