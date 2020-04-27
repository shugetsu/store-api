/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('product', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      field: 'name'
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'price'
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'stock'
    },
    categoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'category_id'
    },
    summary: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'summary'
    },
    mainImgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'main_img_url',
      get() {
        // 如果图片来源是本地的话 则添加域名前缀
        if (this.getDataValue('from') === 1) {
          return app.config.imagePrefixPath + this.getDataValue('mainImgUrl')
        }
        return this.getDataValue('mainImgUrl')
      }
    },
    from: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1',
      field: 'from'
    },
    imgId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'img_id'
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
    tableName: 'product',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {
    app.model.Product.hasMany(app.model.ProductImage, {
      foreignKey: 'productId',
      sourceKey: 'id'
    })
    app.model.Product.hasMany(app.model.ProductProperty, {
      foreignKey: 'productId',
      sourceKey: 'id'
    })

  }

  return Model
}
