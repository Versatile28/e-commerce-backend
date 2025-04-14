const Product = require('../models/productModel');

const createProduct = async (req, res) => {
   try {
      const { name, price, category, image, rating, description, badge, type, size, brand, tags, created } =
         req.body;

         if (!name || !price || !category || !image || !description || !type || !size || !brand) {
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
         type,
         size,
         brand,
         tags,
         created
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
      const optimizedProducts = products.map(product => ({
         ...product._doc,
         image: product.image.replace('/upload/', '/upload/w_600,h_750,c_fill,f_auto,q_auto/')
     }));
      res.json(optimizedProducts);
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