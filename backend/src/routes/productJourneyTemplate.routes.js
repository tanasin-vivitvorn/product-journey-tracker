const express = require('express');
const router = express.Router();
const ProductJourneyTemplateController = require('../controllers/ProductJourneyTemplateController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', ProductJourneyTemplateController.getAllProductJourneyTemplates);
router.post('/', ProductJourneyTemplateController.createProductJourneyTemplate);
router.get('/:id', ProductJourneyTemplateController.getProductJourneyTemplateById);
router.put('/:id', ProductJourneyTemplateController.updateProductJourneyTemplate);
router.delete('/:id', ProductJourneyTemplateController.deleteProductJourneyTemplate);

module.exports = router;
