const express = require('express');
const router = express.Router();
const ProductTypeController = require('../controllers/ProductTypeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/search', ProductTypeController.searchProductTypes);
router.get('/', ProductTypeController.getAllProductTypes);
router.post('/', ProductTypeController.createProductType);
router.get('/:id', ProductTypeController.getProductTypeById);
router.put('/:id', ProductTypeController.updateProductType);
router.delete('/:id', ProductTypeController.deleteProductType);

module.exports = router;
