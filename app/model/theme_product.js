/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('themeProduct', {
    themeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'theme_id'
    },
    productId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'product_id'
    }
  }, {
    tableName: 'theme_product',
    timestamps: false
  })

  Model.associate = function() {

  }

  return Model
}
