let db = require('../database/models');

let mainController = {
    //USERS
    users: async(req,res) => {
        try{
            let users = await db.Users.findAll();
            return res.status(200).json({
                status: 200,
                length: users.length,
                data: users,
            });
        } catch(err){
            console.error(err);
        };
    },
    login: async(req,res) => {
        try{
            let body = req.body;
            let user = await db.Users.findOne({
                where: {mail: body.mail, password: body.password},
            });
            console.log(user);
            delete user.dataValues.password
            return res.status(200).json({
                status: 200,
                data: user,
            });
        } catch(err){
            console.error(err);
        };
    },
    userByPk: async (req, res) => {
        try{
            let user = await db.Users.findByPk(req.params.id);
            return res.status(200).json({
                status: 200,
                data: user,
            });
        }catch (err){
            console.error(err)
        }
    },
    //MOVEMENTS
    movementsByUser: async(req, res) => {
        let categories = await db.Categories.findAll();
        let movements = await db.Movements.findAll({
            where: {user_id: req.params.id },
            order: [['date', 'desc'], ['id', 'desc']]
        });

        return res.status(200).json({
            status: 200,
            length: movements.length,
            data: movements.map(movement => { 
                return {
                    ...movement.dataValues,
                    category: categories.filter(category => category.id === movement.category_id)[0],
                    
                }
            }) 
        });
        
    },
    balanceByUser: async(req, res) => {
        try{
            let movements = await db.Movements.findAll();
            let positiveBalance = movements.map(movement => {
                if(movement.type === 'receipt'){
                    return Number(movement.amount)
                } else {
                    return 0
                }
            }) 
            positiveBalance = positiveBalance.reduce((acum, acumAct) => {
                return acum + acumAct;
            })
            let negativeBalance = movements.map(movement => {
                if(movement.type === 'expense'){
                    return Number(movement.amount)
                } else {
                    return 0
                }
            }) 
            negativeBalance = negativeBalance.reduce((acum, acumAct) => {
                return acum + acumAct;
            })
            
            return res.status(200).json({
                status: 200,
                data: {
                    positive_balance: Math.round(positiveBalance),
                    negative_balance: Math.round(negativeBalance),
                    balance: Math.round(positiveBalance - negativeBalance)
                }
            })
        }catch(err){
            console.error(err);
        }
    },
    add: async(req, res) => {
        try{
            let body = req.body;
            await db.Movements.create({...body});
            return res.status(200).json({
                state: 200,
                msj: "successful action",
                data: req.body,
            })
        }catch (err){
            console.error(err);
        }
    },
    edit: async(req, res) => {
        try{
            let body = req.body;
            console.log(body);
            await db.Movements.update({...body}, {where: {id: req.params.id}});
            return res.status(200).json({
                state: 200,
                msj: "successful action",
                data: req.body,
            })
        }catch(err){
            console.error(err);
        }
    },
    delete: async(req, res) => {
        try{
            await db.Movements.destroy({where: {id: req.params.id}});
            return res.status(200).json({
                state: 200,
                msj: "successful action",
                data: req.body,
            })
        }catch(err){
            console.error(err);
        }
    },
    //CATEGORIES
    categories: async(req,res) => {
        try{
            let categories = await db.Categories.findAll();
            return res.status(200).json({
                status: 200,
                length: categories.length,
                data: categories,
            });
        } catch(err){
            console.error(err);
        };
    },
};

module.exports = mainController;

