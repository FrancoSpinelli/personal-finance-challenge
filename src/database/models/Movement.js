const Sequelize = require('sequelize');


module.exports = (sequelize,dataTypes) => {

    let alias = "Movements";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        type:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        date:{
            type: dataTypes.DATE,
            allowNull: false,
        },
        amount: {
            type:dataTypes.DECIMAL,
            allowNull: false,
        },
        concept: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            field: 'created_at',
            type: dataTypes.DATE,
        },
        updatedAt: {
            field: 'update_at',
            type: dataTypes.DATE,
        },
    };

    let config = {
        tableName: "movements",
        timestamps: true
    }

    const Movements = sequelize.define(alias,cols,config);

    return Movements;
}