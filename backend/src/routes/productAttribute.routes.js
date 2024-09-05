const express = require('express');
const router = express.Router();
const ProductAttributeController = require('../controllers/productAttribute.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', ProductAttributeController.createProductAttribute);
router.get('/', ProductAttributeController.getAllProductAttributes);
router.get('/:id', ProductAttributeController.getProductAttributeById);
router.put('/:id', ProductAttributeController.updateProductAttribute);
router.delete('/:id', ProductAttributeController.deleteProductAttribute);

module.exports = router;
