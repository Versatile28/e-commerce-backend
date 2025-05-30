const express = require('express');

const {
   createProduct,
   fetchProducts,
   fetchOne,
   fetchCategories,
} = require('../controllers/productController');

const { createMenu, fetchMenu } = require('../controllers/menuController');

const { getFilteredProducts } = require('../controllers/filterController');

const router = express.Router();

router.get('/products', fetchProducts);

router.get('/products/:id', fetchOne);

router.get('/categories', fetchCategories);

router.post('/products', createProduct);

router.post('/menu', createMenu);

router.get('/menu', fetchMenu);

router.get('/filter', getFilteredProducts);

module.exports = router;
