/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('productImage', {
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
    productId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'product_id'
    },
    order: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'order'
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
    tableName: 'product_image',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {
    app.model.ProductImage.belongsTo(app.model.Image, {
      foreignKey: 'imgId',
      sourceKey: 'id',
      as: 'image'
    })
  }

  return Model
}
