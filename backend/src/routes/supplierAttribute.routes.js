const express = require('express');
const router = express.Router();
const SupplierAttributeController = require('../controllers/SupplierAttributeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', SupplierAttributeController.createSupplierAttribute);
router.get('/', SupplierAttributeController.getAllSupplierAttributes);
router.get('/:id', SupplierAttributeController.getSupplierAttributeById);
router.put('/:id', SupplierAttributeController.updateSupplierAttribute);
router.delete('/:id', SupplierAttributeController.deleteSupplierAttribute);

module.exports = router;
