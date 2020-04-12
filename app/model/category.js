/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize

  const Model = app.model.define('category', {
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
    topicImgId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'topic_img_id'
    },
    description: {
      type: DataTypes.STRING(100),
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
    tableName: 'category',
    paranoid: true,
    timestamps: true
  })

  Model.associate = function() {
    app.model.Category.belongsTo(app.model.Image, {
      foreignKey: 'topicImgId',
      sourceKey: 'id',
      as: 'topicImage'
    })
    app.model.Category.hasMany(app.model.Product, {
      foreignKey: 'categoryId',
      sourceKey: 'id'
    })
  }

  return Model
}
