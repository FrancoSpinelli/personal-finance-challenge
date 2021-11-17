const Sequelize = require('sequelize');


module.exports = (sequelize,dataTypes) => {

    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        mail: {
            type:dataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: dataTypes.STRING
        }
    };

    let config = {
        tableName: "users",
        timestamps: false
    }

    const Users = sequelize.define(alias,cols,config);

    return Users;
}