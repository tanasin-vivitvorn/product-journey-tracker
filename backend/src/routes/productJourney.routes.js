const express = require('express');
const router = express.Router();
const ProductJourneyController = require('../controllers/ProductJourneyController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', ProductJourneyController.getAllProductJourneys);
router.post('/', ProductJourneyController.createProductJourney);
router.get('/:id', ProductJourneyController.getProductJourneyById);
router.put('/:id', ProductJourneyController.updateProductJourney);
router.delete('/:id', ProductJourneyController.deleteProductJourney);

module.exports = router;
