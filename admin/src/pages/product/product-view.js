import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Button, Card, Carousel, ListGroup, Modal } from 'react-bootstrap';
import { setFileInputPreview } from '../../utils/fileUtil';
import {
  fetchProductData,
  fetchProductTypes,
  fetchProductAttributeTemplate,
  fetchJourneys,
} from '../../redux/slices/productSlice';
import withAuth from "../../middleware/withAuth";

const FormGenerator = dynamic(() => import('../../components/FormGenerator'), { ssr: false });


const ProductCreate = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { productID } = router.query;

  const {
    productTypes,
    formData,
    answerData,
    journeyData,
    journeys,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [selectedJourney, setSelectedJourney] = useState(null);

  useEffect(() => {
    if (router.isReady) {  
      console.log(productID);
      dispatch(fetchProductTypes());
    }
  }, [router.isReady, dispatch]);

  useEffect(() => {
    console.log(productID);
    if (productID) {
      dispatch(fetchProductData(productID));
    } else if (selectedProductType) {
      dispatch(fetchProductAttributeTemplate(selectedProductType));
      dispatch(fetchJourneys(selectedProductType));
    }
  }, [dispatch, productID, selectedProductType]);

  // useEffect(() => {
  //   console.log(journeyData);
  // }, [journeyData]);

  useEffect(() => {
    setTimeout(() => {
      formData.filter(async(e) => {
          if(e.element === 'Camera' || e.element === 'FileUpload') {
            if (answerData && answerData.hasOwnProperty(e.field_name) && answerData[e.field_name]) {
              console.log(e.field_name, answerData[e.field_name]);
              await setFileInputPreview(e.field_name, answerData[e.field_name]);   
            }
          }
        });
    }, 500);
  }, [formData]);

  useEffect(() => {
    setTimeout(() => {
      console.log(selectedJourney);
      selectedJourney?.element.filter((e) => {
        if(selectedJourney.answer && e.element === 'Camera' || e.element === 'FileUpload') {
          if (selectedJourney?.answer.hasOwnProperty(e.field_name) && selectedJourney.answer[e.field_name]) {
              console.log(e.field_name, selectedJourney.answer[e.field_name]);
              setFileInputPreview(e.field_name, selectedJourney.answer[e.field_name]);   
          }
        }
      });
    }, 500);
  }, [selectedJourney]);

  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value);
  };

  const handleJourneyClick = (journey) => {
    console.log(journey);
    setSelectedJourney(journey);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJourney(null);
  };

  const handleSubmit = (data) => {
    console.log('handleSubmit', data);
    const payload = {
      productType: selectedProductType,
      // Add other necessary data
    };

    if (productID) {
      dispatch(editProduct({ productID, ...payload }));
    } else {
      dispatch(createProduct(payload)).then((response) => {
        const newProductID = response.payload.id; // Assuming the API returns the new product ID
        router.push(`/product-create?productID=${newProductID}`);
      });
    } 
  };

  const generateFromTemplate = (template, data) => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data.hasOwnProperty(key) ? data[key] : match;
    });
  }

  return (
    <div className="container">
      <h1 className="mt-5">Create New Product</h1>
      <div className="form-group">
        <label>Select Product Type</label>
        <select className="form-control" value={selectedProductType} onChange={handleProductTypeChange} disabled={productID != null}>
          <option value="">Select Product Type</option>
          {productTypes?.map((type) => (
            <option key={type.ProductTypeID} value={type.ProductTypeID}>
              {type.ProductTypeName}
            </option>
          ))}
        </select>
      </div>

      {formData.length > 0 && (
        <FormGenerator data={formData} hide_actions={true} answer_data={answerData} onSubmit={handleSubmit}/>
      )}

      <h3 className="mt-4">Product Journeys</h3>
      {journeyData?.length > 0 ? (
        <ListGroup>
          {journeyData?.map((journey, index) => (
            <ListGroup.Item key={journey.JourneyID} action onClick={() => handleJourneyClick(journey)} >
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
                  <Card.Header>{journey.processDate? journey.processDate: 'Not created yet!'}</Card.Header>
                  {/* {
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
                  } */}
                  <Card.Body>
                    <Card.Title>{journey.JourneyName}</Card.Title>
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
      ) : (
        <p>No journeys available for the selected product type.</p>
      )}
      {selectedJourney ? (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedJourney?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedJourney?.description}</p>
            <FormGenerator data={selectedJourney?.element} hide_actions={true} answer_data={selectedJourney?.answer} />
          </Modal.Body>
          <Modal.Footer>
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
