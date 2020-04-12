/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('order', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    orderNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'order_no'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      field: 'user_id'
    },
    prepayId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'prepay_id'
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      field: 'total_price'
    },
    totalCount: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      field: 'total_count'
    },
    snapName: {
      type: DataTypes.STRING(80),
      allowNull: true,
      field: 'snap_name'
    },
    snapSpecification: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'snap_specification'
    },
    snapImg: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'snap_img'
    },
    snapAddress: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'snap_address'
    },
    snapItems: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'snap_items'
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '1',
      field: 'status'
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
    tableName: 'order',
    paranoid: true,
    timestamps: true
  });

  Model.associate = function() {

  }

  return Model;
};
