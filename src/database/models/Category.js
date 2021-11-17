const Sequelize = require('sequelize');


module.exports = (sequelize,dataTypes) => {

    let alias = "Categories";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    };

    let config = {
        tableName: "categories",
        timestamps: false
    }

    const Categories = sequelize.define(alias,cols,config);

    return Categories;
}