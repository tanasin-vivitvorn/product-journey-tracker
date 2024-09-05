const express = require('express');
const router = express.Router();
const ProductJourneyAttributeController = require('../controllers/ProductJourneyAttributeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', ProductJourneyAttributeController.createProductJourneyAttribute);
router.get('/', ProductJourneyAttributeController.getAllProductJourneyAttributes);
router.get('/:id', ProductJourneyAttributeController.getProductJourneyAttributeById);
router.put('/:id', ProductJourneyAttributeController.updateProductJourneyAttribute);
router.delete('/:id', ProductJourneyAttributeController.deleteProductJourneyAttribute);

module.exports = router;
