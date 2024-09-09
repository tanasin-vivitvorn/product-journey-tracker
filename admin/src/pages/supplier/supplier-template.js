import React, { useState, useEffect } from 'react';
import axiosInstance from '../../interceptors/axiosConfig';
import dynamic from 'next/dynamic';
import withAuth from '../../middleware/withAuth';

const FormBuilder = dynamic(
  () => import('../../components/FormBuilder'),
  { ssr: false }
);

const SupplierTemplate = () => {
  const [formData, setFormData] = useState([]);

  // Fetch the supplier form template on component mount
  useEffect(() => {
    axiosInstance.get('/api/supplier-templates').then((response) => {
      console.log(response.data[0].FieldTemplate);
      setFormData(JSON.parse(response.data[0].FieldTemplate));
    }).catch((e) => {
      console.log('Axios error', e)
    })
  }, []);

  const handleSave = async () => {
    console.log('Form Data Saved:', formData);
    try {
      console.log(formData);
      const response = await axiosInstance.post(`/api/supplier-templates`, {
        FieldTemplate: JSON.stringify(formData),
        IsActive: true,
        CreateBy: 1
      });
      console.log(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error creating new journey:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Supplier Template</h1>
      <div className="mt-4">
          <FormBuilder data={formData} />
        <button className="btn btn-primary mt-3" onClick={handleSave}>
          Save Form Template
        </button>
      </div>
    </div>
  );
};

export default withAuth(SupplierTemplate);
