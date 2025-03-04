const express = require('express');

const {
   createProduct,
   fetchProducts,
   fetchOne,
   fetchCategories,
} = require('../controllers/productController');

const router = express.Router();

router.get('/products', fetchProducts);

router.get('/products/:id', fetchOne);

router.get('/categories', fetchCategories);

router.post('/products', createProduct);

module.exports = router;
