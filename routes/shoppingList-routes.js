const express = require('express');
const router = express.Router();

const shoppingList_controller = require ('../controllers/shoppingList_controller');

router.get('shopping_list/:id', shoppingList_controller.get_product);

module.exports = router;