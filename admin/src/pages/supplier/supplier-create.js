import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axiosInstance from '../../interceptors/axiosConfig';
import dynamic from 'next/dynamic';
import withAuth from '../../middleware/withAuth';
import {
  createSupplier,
  editSupplier,
  fetchSuppliersByID
} from '../../redux/slices/supplierSlice';
// import { setFileInputPreview } from '../../utils/fileUtil';

const FormGenerator = dynamic(() => import('../../components/FormGenerator'), { ssr: false });


const SupplierCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { supplierID } = router.query;

  const {
    suppliers,
  } = useSelector((state) => state.suppliers);
  const [formData, setFormData] = useState([]);
  const [supplierName, setSupplierName] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      axiosInstance.get('/api/supplier-templates').then((response) => {
        console.log(response.data[0].FieldTemplate);
        setFormData(JSON.parse(response.data[0].FieldTemplate));
      }).catch((e) => {
        console.log('Axios error', e)
      });
    }
  }, [router.isReady, dispatch]);

  useEffect(() => {
    if (supplierID) {
      dispatch(fetchSuppliersByID(supplierID));
    } 
  }, [dispatch, supplierID]);

  useEffect(() => {
    setSupplierName(suppliers.SupplierName);
  }, [suppliers])
  

  const handleSupplierNameChange = (event) => {
    setSupplierName(event.target.value);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //       formData.filter((e) => {
  //           if(e.element === 'Camera' || e.element === 'FileUpload') {
  //               if (answerData.hasOwnProperty(e.field_name)) {
  //                   console.log(e.field_name, answerData[e.field_name]);
  //                   setFileInputPreview(e.field_name, answerData[e.field_name]);   
  //               }
  //           }
  //         });
  //   }, 500);
  // }, [formData]);

  const handleSubmit = (data) => {
    const payload = {
      SupplierName: supplierName,
      Attributes: JSON.stringify(formData),
      Answer: JSON.stringify(data),
      IsVisible: true,
      CreateBy: 1
    };

    if (supplierID) {
        payload['SupplierID'] = supplierID;
        console.log('editSupplier', payload);
        dispatch(editSupplier(payload)); 
    } else  {
      dispatch(createSupplier(payload)); 
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">{(supplierID)?'Edit':'Create New'} Supplier</h1>

      <div className="form-group">
        <label>Supplier Name:</label>
        <input className="form-control" value={supplierName} onChange={handleSupplierNameChange}></input>
      </div>
      {formData.length > 0 && (
        <FormGenerator data={formData} hide_actions={true} answer_data={suppliers.answer} onSubmit={handleSubmit}/>
      )}
    </div>
  );
};

export default withAuth(SupplierCreate);
