const express = require("express");
// const auth = require("../middleware/auth.middleware");
const { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const router = express.Router();

// router.use(auth);

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/",createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;