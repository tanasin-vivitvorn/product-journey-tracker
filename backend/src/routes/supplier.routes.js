const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/SupplierController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', SupplierController.createSupplier);
router.get('/', SupplierController.getAllSuppliers);
router.get('/:id', SupplierController.getSupplierById);
router.put('/', SupplierController.updateSupplier);
router.delete('/:id', SupplierController.deleteSupplier);

module.exports = router;
