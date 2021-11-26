let db = require('../database/models');
let path = require('path');
let fs = require('fs');

let mainController = {
    //USERS
    users: async(req,res) => {
        try{
            let users = await db.Users.findAll();
            return res.status(200).json({
                status: 200,
                msj: "successful action",
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
            user !== null ? delete user.dataValues.password : null;
            if (user !== null) {
                return res.status(200).json({
                    status: 200,
                    msj: "successful action",
                    data: user,
                });
            }else{
                return res.status(200).json({
                    status: 204,
                    msj: "user not found",
                    data: null,
                });
            }

        } catch(err){
            console.error(err);
        };
    },
    register: async(req,res) => {
        try{
            let body = req.body;
            let userInDB;
            if (body.mail){
                userInDB = await db.Users.findOne({
                    where: {mail: body.mail}
                })
            }
            if (userInDB === null){
                let image = req.file ? req.file.filename : "default.jpg";
                let user = await db.Users.create({
                    ...body,
                    image: image,
                });
                return res.status(200).json({
                    status: 200,
                    msj: "successful action",
                    data: user,
                });
            } else {
                return res.status(200).json({
                    status: 204,
                    msj: "user in data base",
                    data: null,
                })
            }
        } catch(err){
            console.error(err);
        };
    },
    userByPk: async (req, res) => {
        try{
            let user = await db.Users.findByPk(req.params.id);
            return res.status(200).json({
                status: 200,
                msj: "successful action",
                data: user,
            });
        }catch (err){
            console.error(err)
        }
    },
    userEdit: async (req, res) => {
        try{
            let user = await db.Users.findByPk(req.params.id);
            if ( path.extname(req.file.filename) === ".jpeg" || path.extname(req.file.filename) === ".jpg"){
                await db.Users.update({image: req.file.filename}, {where: {id: req.params.id}})
                return res.status(200).json({
                    status: 200,
                    msj: "successful action",
                    data: user,
                });
            } else {
                console.log(req.file.filename);
                fs.unlinkSync(path.join(__dirname, `../personal-finances-react/src/assets/img/users/${req.file.filename}`));
                return res.status(200).json({
                    status: 204,
                    msj: "invalid image format",
                    data: null,
                });
            }
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
            let movements = await db.Movements.findAll({
                where: {user_id: req.params.id}
            });
            if (movements.length > 0){
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
                        positive_balance: positiveBalance,
                        negative_balance: negativeBalance,
                        balance: (positiveBalance - negativeBalance).toFixed(2)
                    }
                })
            }
            
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
                msj: "successful action",
                length: categories.length,
                data: categories,
            });
        } catch(err){
            console.error(err);
        };
    },
};

module.exports = mainController;

