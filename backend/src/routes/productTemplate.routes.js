const express = require('express');
const router = express.Router();
const ProductTemplateController = require('../controllers/ProductTemplateController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', ProductTemplateController.createProductTemplate);
router.get('/', ProductTemplateController.getAllProductTemplates);
router.get('/:id', ProductTemplateController.getProductTemplateById);
router.put('/:id', ProductTemplateController.updateProductTemplate);
router.delete('/:id', ProductTemplateController.deleteProductTemplate);

module.exports = router;
