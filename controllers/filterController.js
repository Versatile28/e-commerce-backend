const Product = require('../models/productModel');

const getFilteredProducts = async (req, res) => {
   const {
      selectedBrands,
      selectedSize,
      minValue,
      maxValue,
      selected,
      category,
   } = req.query;

   const query = {};

   if (category) query.category = category;
   if (selectedBrands) query.brand = { $in: selectedBrands.split(',') };
   if (selectedSize) query.size = selectedSize;

   if (minValue || maxValue) {
      query.price = {};
      if (minValue) query.price.$gte = parseFloat(minValue);
      if (maxValue) query.price.$lte = parseFloat(maxValue);
   }

   let sortOption = {};
   if (selected === 'Rating') sortOption.rating = -1;
   else if (selected === 'Newest first') sortOption.created = -1;
   else if (selected === 'Popularity') {
      sortOption.rating = -1;
   } else if (selected === 'Default') {
      sortOption = {};
   }

   console.log(query);

   try {
      const filteredProducts = await Product.find(query).sort(sortOption);
      res.json(filteredProducts);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch products' });
   }
};

module.exports = { getFilteredProducts };
