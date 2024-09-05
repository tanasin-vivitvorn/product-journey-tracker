const express = require('express');
const router = express.Router();
const SupplierTemplateController = require('../controllers/SupplierTemplateController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', SupplierTemplateController.getAllSupplierTemplates);
router.post('/', SupplierTemplateController.createSupplierTemplate);
router.get('/:id', SupplierTemplateController.getSupplierTemplateById);
router.put('/:id', SupplierTemplateController.updateSupplierTemplate);
router.delete('/:id', SupplierTemplateController.deleteSupplierTemplate);

module.exports = router;
