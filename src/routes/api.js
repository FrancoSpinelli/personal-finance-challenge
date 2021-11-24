const express = require('express');
const router = express.Router();
const multerMiddleware = require ('../Middlewares/multerMiddleware');

let apiController = require ('../controllers/apiController');


//USERS
router.get('/users', apiController.users);
router.post('/users/login', apiController.login);
router.post('/users/register', multerMiddleware.single('image') ,apiController.register);
router.get('/users/:id', apiController.userByPk);
router.post('/users/edit/:id', multerMiddleware.single('image'), apiController.userEdit);



//MOVEMENTS 
router.get('/movements/:id', apiController.movementsByUser);
router.get('/movements/balance/:id', apiController.balanceByUser);
router.post('/movements/add', apiController.add);
router.post('/movements/edit/:id', apiController.edit);
router.post('/movements/delete/:id', apiController.delete);



//CATEGORIES 
router.get('/categories', apiController.categories);

module.exports = router;