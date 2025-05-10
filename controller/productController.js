const Product = require("../model/productModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = [
  upload.single("image"),
  async (req, res) => {
    const { name, price, inventory, description } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
      const newProduct = new Product({
        name,
        price,
        inventory,
        description,
        image,
      });
      await newProduct.save();
      res.json({
        success: true,
        message: "Product added successfully",
        newProducts: newProduct,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

const updateProduct = [
  upload.single("image"),
  async (req, res) => {
    const { id } = req.params;
    const { name, price, inventory, description } = req.body;
    const image = req.file ? req.file.filename : null;
    try {
      const product = await Product.findById(id);
      if (!product) {
        res.json({
          success: false,
          message: "Product not found",
        });
      }
      product.name = name;
      product.price = price;
      product.inventory = inventory;
      product.description = description;
      if (image) {
        product.image = image;
      }
      await product.save();
      res.json({
        success: true,
        message: "Product Updated successfully",
        product: product,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
