const express = require('express');
const router = express.Router();

let apiController = require ('../controllers/apiController');


//USERS
router.get('/users', apiController.users);
router.get('/users/:id', apiController.userByPk);



//MOVEMENTS 
router.get('/movements/:id', apiController.movementsByUser);



//MOVEMENTS 
router.get('/categories', apiController.categories);

module.exports = router;