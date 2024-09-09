import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import withAuth from '../../middleware/withAuth';
import { Modal, Button } from 'react-bootstrap';

const FormBuilder = dynamic(
  () => import('../../components/FormBuilder'),
  { ssr: false }
);

const ProductTemplate = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [formData, setFormData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('/api/product-types').then((response) => {
      setProductTypes(response.data);
    });
  }, []);

  const fetchProductTemplate = (productType) => {
    axios.get(`/api/product-templates/${productType}`)
      .then(response => {
        setFormData(JSON.parse(response.data.FieldTemplate));
        setShowModal(true);
      })
      .catch(error => {
        console.error(`Axios error: ${error.message}`);
        setFormData([]);
        setShowModal(true);
      });
  };

  const handleProductTypeChange = (event) => {
    const newProductType = event.target.value;
    setSelectedProductType(newProductType);
    if (newProductType) {
      fetchProductTemplate(newProductType);
    }
  };

  const handleSave = () => {
    console.log('Form Data Saved:', formData);
    axios.post('/api/product-templates', { 
      ProductTypeID: parseInt(selectedProductType),
      FieldTemplate: JSON.stringify(formData),
      CreateBy: 1
    })
      .then(response => {
        console.log('Template saved successfully');
        setShowModal(false);
      })
      .catch(error => {
        console.error(`Axios error: ${error.message}`);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="mt-5">Product Template</h1>
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Form Builder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormBuilder data={formData} onChange={setFormData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withAuth(ProductTemplate);