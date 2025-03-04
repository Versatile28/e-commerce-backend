const Product = require('../models/productModel');

const createProduct = async (req, res) => {
   try {
      const { name, price, category, image, rating, description, badge } =
         req.body;

         if (!name || !price || !category || !image || !description) {
            return res.status(400).json({ error: "All fields are required" });
          }

      const product = new Product({
         name,
         price,
         category,
         image,
         rating,
         description,
         badge,
      });

      await product.save();
      res.status(201).json(product);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const fetchProducts = async (req, res) => {
   try {
      const products = await Product.find();
      res.json(products);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const fetchOne = async (req, res) => {
   try {
     const product = await Product.findById(req.params.id);
     if (!product) {
       return res.status(404).json({ error: "Product not found" });
     }
     res.json(product);
   } catch (error) {
     res.status(500).json({ error: "Invalid Product ID or Server Error" });
   }
 };

 const fetchCategories = async (req, res) => {
   try {
     const categories = await Product.distinct("category");
     res.json(categories);
   } catch (error) {
     res.status(500).json({ error: "Server Error" });
   }
 };

module.exports = { createProduct, fetchProducts, fetchOne, fetchCategories };