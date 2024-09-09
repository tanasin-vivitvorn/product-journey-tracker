import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Button, Card, Carousel, ListGroup, Modal } from 'react-bootstrap';
import {
  fetchProductData,
  fetchProductTypes,
  fetchProductAttributeTemplate,
  fetchJourneys,
  createProduct,
  createJourney,
  editProduct
} from '../../redux/slices/productSlice';
import { fetchSuppliers } from "../../redux/slices/supplierSlice";
import withAuth from "../../middleware/withAuth";
import { toast } from 'react-toastify';
import LoadingMask from '../../components/LoadingMask';
import { preparePayload, prepareJourneyPayload, setFileInputPreview } from '../../utils/fileUtil';

const FormGenerator = dynamic(() => import('../../components/FormGenerator'), { ssr: false });

const ProductCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { productID } = router.query;

  const {
    product,
    productTypes,
    supplier,
    formData,
    answerData,
    journeyData,
    loading,
    status,
    error,
  } = useSelector((state) => state.products);
  const {
    suppliers
  } = useSelector((state) => state.suppliers);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [images, setImages] = useState([]); // New state for images

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchProductTypes());
      dispatch(fetchSuppliers());
    }
  }, [router.isReady, dispatch]);

  useEffect(() => {
    setProductName(product?.productName);
    setSelectedProductType(product?.productType?.ProductTypeID);
  }, [product]);

  useEffect(() => {
    setSelectedSupplier(supplier?.SupplierID);
  }, [supplier]);

  useEffect(() => {
    if (productID) {
      dispatch(fetchProductData(productID));
    } else if (selectedProductType) {
      dispatch(fetchProductAttributeTemplate(selectedProductType));
      dispatch(fetchJourneys(selectedProductType));
    }
  }, [dispatch, productID, selectedProductType]);

  useEffect(() => {
    setTimeout(() => {
      formData.filter(async(e) => {
          if(e.element === 'Camera' || e.element === 'FileUpload') {
            if (answerData && answerData.hasOwnProperty(e.field_name) && answerData[e.field_name]) {
              await setFileInputPreview(e.field_name, '/api' + answerData[e.field_name]);   
            }
          }
        });
    }, 500);
  }, [formData]);

  useEffect(() => {
    setTimeout(() => {
      const elementsString = selectedJourney?.ProductJourneyTemplates;
      const elements = (elementsString) ? JSON.parse(elementsString):[];
      elements.filter((e, index) => {
        if(selectedJourney.answer && (e.element === 'Camera' || e.element === 'FileUpload')) {
          if (selectedJourney.answer[index]) {
            setFileInputPreview(e.field_name, '/api' + selectedJourney.answer[index].value);   
          }
        }
      });
    }, 500);
  }, [selectedJourney]);

  useEffect(() => {
    if(status === 'success'){
      toast.success('Operation successful!');
    } else if (error) {
      if (error.endsWith('401')) {
        router.push('/auth/login');
      } else {
        toast.error('Operation failed. Please try again.');
      }
    }
  }, [status, error]);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSupplierChange = (event) => {
    setSelectedSupplier(event.target.value);
  };

  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value);
  };

  const handleMessageTemplateChange = (event) => {
    setMessageTemplate(event.target.value);
  };

  const handleJourneyClick = (journey) => {
    setSelectedJourney(journey);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJourney(null);
  };

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result.split(',')[1]; // Base64 encoding
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleSubmit = async (data) => {
    const rawPayload = {
      ProductName: productName,
      SupplierID: selectedSupplier,
      ProductTypeID: selectedProductType,
      attributes: formData,
      answer: data,
      images, // Add images to the payload
      CreateBy: 1
    };
    console.log('rawPayload', rawPayload);
    const payload = await preparePayload(rawPayload);
    if (productID) {
      dispatch(editProduct({ ProductID: productID, ...payload }));
    } else {
      dispatch(createProduct(payload)).then((response) => {
        const newProductID = response.payload?.id; // Assuming the API returns the new product ID
        router.push(`/product-create?productID=${newProductID}`);
      });
    } 
  };

  const handleSaveJourneyModal = async (data) => {
    const editedData = await prepareJourneyPayload(data);
    const payload = {
      ProductID: parseInt(productID),
      ProductJourneyID: selectedJourney.ProductJourneyID,
      FieldTemplate: selectedJourney.ProductJourneyTemplates,
      Answer: JSON.stringify(editedData),
      IsVisible: true,
      CreateBy: 1
    };
    
    dispatch(createJourney(payload));
  }

  const generateFromTemplate = (template, data) => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data.hasOwnProperty(key) ? data[key] : match;
    });
  }

  return (
    <div className="container">
      {status === 'loading' && <LoadingMask />}
      <h1 className="mt-5">Create New Product</h1>
      <div className="product-form-container">
        <div className="form-group">
          <label className="form-label"><span>Product Name:</span></label>
          <input className="form-control" value={productName} onChange={handleProductNameChange}></input>
        </div>
        
        <div className="form-group">
          <label className="form-label"><span>Upload Images:</span></label>
          {images.map((_, index) => (
            <div key={index} className="mb-2">
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleImageUpload(e, index)}
                accept="image/*"
              />
              <Button variant="danger" onClick={() => removeImageField(index)} className="mt-2">
                Remove Image
              </Button>
            </div>
          ))}
          <Button variant="primary" onClick={addImageField}>
            Add More Image
          </Button>
        </div>
        
        <div className="form-group">
          <label className="form-label"><span>Select Supplier:</span></label>
          <select className="form-control" value={selectedSupplier} onChange={handleSupplierChange} disabled={productID != null}>
            <option value="">Select Supplier</option>
            {suppliers?.map((sup) => (
              <option key={sup.SupplierID} value={sup.SupplierID}>
                {sup.SupplierName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Select Product Type:</label>
          <select className="form-control" value={selectedProductType} onChange={handleProductTypeChange} disabled={productID != null}>
            <option value="">Select Product Type</option>
            {productTypes?.map((type) => (
              <option key={type.ProductTypeID} value={type.ProductTypeID}>
                {type.ProductTypeName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {formData.length > 0 && (
        <div style={{marginTop: '20px'}}>
          <h3>Product Attributes</h3>
          <div className="product-form-container">
            <FormGenerator data={formData} hide_actions={true} answer_data={answerData} onSubmit={handleSubmit}/>
          </div>
        </div>
      )}

      {journeyData?.length > 0 ? (
        <div style={{marginTop: '20px'}}>
          <h3 className="mt-4">Product Journeys</h3>
          <ListGroup className="product-form-container">
            {journeyData?.map((journey, index) => (
              <ListGroup.Item key={journey.ProductJourneyID} action onClick={() => handleJourneyClick(journey)}>
                <div style={{
                  width:'100%',
                  display:'flex',
                  direction:'row',
                  justifyContent: index%2 === 0? 'start':'end'
                }}>
                  <Card
                    bg={index%2 === 0? "secondary" : "primary"}
                    key="Secondary"
                    text="white"
                    style={{ width: '36rem' }}
                    className="mb-2"
                  >
                    <Card.Header>{journey.createAt? journey.createAt: 'Not created yet!'}</Card.Header>
                    {
                      journey.element?.map((e, index) => (
                        e.element === 'Camera' ? 
                          <Carousel>
                            <Carousel.Item interval={5000}>
                              <img
                                  className="d-block w-100"
                                  src={journey?.answer[e.field_name]}
                                alt={e.field_name}/>
                            </Carousel.Item>
                          </Carousel>
                        : <></>)
                      )
                    }
                    <Card.Body>
                      <Card.Title>{journey.ProductJourneyName}</Card.Title>
                      <Card.Text style={{ textAlign: 'left' }}>
                        {
                          journey.messageTemplate ? generateFromTemplate(journey.messageTemplate, journey.answer):''
                        }
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <p>No journeys available for the selected product type.</p>
      )}
      {(selectedJourney?.ProductJourneyTemplates) ? (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedJourney?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedJourney?.description}</p>
            <div className="form-group">
              <label>Message Template:</label>
              <textarea className="form-control" value={selectedJourney?.messageTemplate} onChange={handleMessageTemplateChange}>
              </textarea>
            </div>
            <br/>
            <FormGenerator data={
              (selectedJourney?.ProductJourneyTemplates)?
              JSON.parse(selectedJourney?.ProductJourneyTemplates): []} hide_actions={true} 
              answer_data={selectedJourney?.answer} 
              onSubmit={handleSaveJourneyModal}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSaveJourneyModal}>
              Save
            </Button>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        ) : <></>
      }
    </div>
  );
};

export default withAuth(ProductCreate);
