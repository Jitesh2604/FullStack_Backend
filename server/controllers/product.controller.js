const Product = require("../models/product.model");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSingleProduct = async (req, res) => {
    try {
        const singleProduct = await Product.findOne(req.params.id);
        req.json(singleProduct);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.createProduct = async (req, res) => {
    const { name, price, description } = req.body;
    try {
        const product = new Product({ name, price, description });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updateTask = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updateTask);
    } catch (err) {
        res.status(400).json({ error: err.message})
    }
};

exports.deleteProduct = async (req, res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json({message: "Product Deleted Successfully!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}