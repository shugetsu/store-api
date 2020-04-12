/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('productProperty', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    productId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'product_id'
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'name'
    },
    detail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'detail'
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
    tableName: 'product_property',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {

  }

  return Model
}
