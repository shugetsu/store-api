/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('userAddress', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id'
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: 'name'
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'mobile'
    },
    default: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0',
      field: 'default'
    },
    province: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'province'
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'city'
    },
    country: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'country'
    },
    detail: {
      type: DataTypes.STRING(100),
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
    tableName: 'user_address',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {

  }

  return Model
}
