import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import withAuth from '../../middleware/withAuth';

const FormBuilder = dynamic(
  () => import('../../components/FormBuilder'),
  { ssr: false }
);

const ProductJourneyTemplate = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [journeys, setJourneys] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedJourney, setSelectedJourney] = useState('');
  const [formData, setFormData] = useState([]);

  // Fetch product types on component mount
  useEffect(() => {
    axios.get('/api/product-types').then((response) => {
      setProductTypes(response.data);
    });
  }, []);

  // Fetch journeys when selectedProductType changes
  useEffect(() => {
    if (selectedProductType) {
      axios.get(`/api/journeys/${selectedProductType}`).then((response) => {
        setJourneys(response.data);
      });
    } else {
      setJourneys([]);
    }
  }, [selectedProductType]);

  // Fetch form template data when selectedProductType or selectedJourney changes
  useEffect(() => {
    if (selectedProductType && selectedJourney) {
      axios.get(`/api/product-journey-template/${selectedProductType}/${selectedJourney}`).then((response) => {
        setFormData(response.data);
      });
    } else {
      setFormData([]);
    }
  }, [selectedProductType, selectedJourney]);

  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value);
    setSelectedJourney(''); // Reset journey when product type changes
  };

  const handleJourneyChange = (event) => {
    setSelectedJourney(event.target.value);
  };

  const handleSave = () => {
    console.log('Form Data Saved:', formData);
    // Implement saving logic to store the form template
  };

  return (
    <div className="container">
      <h1 className="mt-5">Product Journey Template</h1>
      <div className="form-group">
        <label htmlFor="productType">Select Product Type</label>
        <select
          id="productType"
          className="form-control"
          value={selectedProductType}
          onChange={handleProductTypeChange}
        >
          <option value="">Select Product Type</option>
          {productTypes.map((type) => (
            <option key={type.ProductTypeID} value={type.ProductTypeID}>
              {type.ProductTypeName}
            </option>
          ))}
        </select>
      </div>

      {selectedProductType && (
        <div className="form-group mt-3">
          <label htmlFor="journey">Select Journey</label>
          <select
            id="journey"
            className="form-control"
            value={selectedJourney}
            onChange={handleJourneyChange}
          >
            <option value="">Select Journey</option>
            {journeys.map((journey) => (
              <option key={journey.JourneyID} value={journey.JourneyID}>
                {journey.JourneyName}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-4">
        {formData.length > 0 ? (
          <FormBuilder data={formData} />
        ) : (
          <p>Please select a product type and journey to start building the form.</p>
        )}
        <button className="btn btn-primary mt-3" onClick={handleSave}>
          Save Form Template
        </button>
      </div>
    </div>
  );
};

export default withAuth(ProductJourneyTemplate);
