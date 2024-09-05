const productJourneyService = require('../services/productJourney.service');

class ProductJourneyController {
  async createJourney(req, res) {
    try {
      const { ProductID, FieldID, Value, IsVisible, CreateBy } = req.body;
      const journey = await productJourneyService.createJourney({
        ProductID,
        FieldID,
        Value,
        IsVisible,
        CreateBy
      });
      res.status(201).json(journey);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateJourney(req, res) {
    try {
      const { ProductJourneyID, ProductID, FieldID, Value, IsVisible, UpdateBy } = req.body;
      const journey = await productJourneyService.updateJourney(ProductJourneyID, {
        ProductID,
        FieldID,
        Value,
        IsVisible,
        UpdateBy
      });
      res.status(200).json(journey);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteJourney(req, res) {
    try {
      const { ProductJourneyID } = req.body;
      await productJourneyService.deleteJourney(ProductJourneyID);
      res.status(200).json({ message: 'Journey deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ProductJourneyController();
