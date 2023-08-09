const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Movie",{
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    year:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    rated:{
      type:DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    released:{
      type:DataTypes.STRING,
      allowNull: false,
    },
    duration:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 120
    },
    director:{
      type:DataTypes.STRING,
      allowNull: true,
      defaultValue: "Unknown"
    },
    plot:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    language:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "English",
    },
    poster:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    metascore:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    view:{
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    }
  },{
    timestamps: false
  })
}