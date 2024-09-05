const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// router.use(authMiddleware);

router.get('/:id', productController.getProductById);
router.get('/', productController.getAllProducts);
router.post('/search', productController.searchProducts);
router.post('/create', productController.createProduct);
router.put('/', productController.editProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
