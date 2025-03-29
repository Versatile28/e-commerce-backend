const Menu = require('../models/menuModel');

const createMenu = async (req, res) => {
   try {
      const { name, image, subcategories } =
         req.body;

         if (!name || !subcategories) {
            return res.status(400).json({ error: "All fields are required" });
          }

      const menu = new Menu({
         name,
         image,
         subcategories
      });

      await menu.save();
      res.status(201).json(menu);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

const fetchMenu = async (req, res) => {
   try {
      const menu = await Menu.find();
      const optimizedMenu = menu.map((menuItem) => ({
         ...menuItem._doc,
         image: menuItem.image
            ? menuItem.image.replace(
                 '/upload/',
                 '/upload/w_600,h_750,c_fill,f_auto,q_auto/'
              )
            : null,
         subcategories:
            menuItem.subcategories?.map((sub) => ({
               ...sub._doc,
               image: sub.image
                  ? sub.image.replace(
                       '/upload/',
                       '/upload/w_500,h_750,c_fill,f_auto,q_auto/'
                    )
                  : null,
            })) || [],
      }));
      res.json(optimizedMenu);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

module.exports = { createMenu, fetchMenu };