import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { Form, Button, Modal, Table, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import withAuth from '../../middleware/withAuth';

// Dynamically load FormBuilder to avoid SSR issues
const FormBuilder = dynamic(
  () => import('../../components/FormBuilder'),
  { ssr: false }
);

const ProductJourneyPage = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [journeys, setJourneys] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [formData, setFormData] = useState([]);
  const [newJourney, setNewJourney] = useState({ name: '', description: '' });

  // Fetch product types on component mount
  useEffect(() => {
    axios.get('/api/product-types').then((response) => {
      setProductTypes(response.data);
    });
  }, []);

  // Fetch journeys when product type changes
  useEffect(() => {
    if (selectedProductType) {
      axios.get(`/api/product-journeys/${selectedProductType}`).then((response) => {
        setJourneys(response.data);
      });
    } else {
      setJourneys([]);
    }
  }, [selectedProductType]);

  const handleProductTypeChange = (event) => {
    setSelectedProductType(event.target.value);
  };

  const handleJourneyClick = (journey) => {
    setSelectedJourney(journey);
    axios.get(`/api/journey-form-data/${journey.id}`).then((response) => {
      setFormData(response.data || []); // Use predefined data if available, otherwise empty
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJourney(null);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(journeys);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update sort indexes
    const updatedItems = items.map((item, index) => ({
      ...item,
      sortIndex: index + 1,
    }));

    setJourneys(updatedItems);

    // Send updated sort order to the server
    try {
      await axios.post(`/api/update-journey-sort`, {
        journeys: updatedItems.map(({ id, sortIndex }) => ({ id, sortIndex })),
      });
    } catch (error) {
      console.error('Error updating journey sort order:', error);
    }
  };

  const handleNewJourneyChange = (e) => {
    setNewJourney({ ...newJourney, [e.target.name]: e.target.value });
  };

  const handleCreateNewJourney = async () => {
    if (!newJourney.name || !newJourney.description) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post(`/api/create-journey`, {
        ...newJourney,
        productTypeId: selectedProductType,
        sortIndex: journeys.length + 1,
        hasFormData: false,
      });

      setJourneys([...journeys, response.data]);
      setNewJourney({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating new journey:', error);
    }
  };

  const renderTableRows = () => {
    return journeys.map((journey, index) => (
      <Draggable key={journey.id} draggableId={journey.id.toString()} index={index}>
        {(provided) => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => handleJourneyClick(journey)}
            style={{
              ...provided.draggableProps.style,
              cursor: 'pointer',
              backgroundColor: journey.hasFormData ? '#dff0d8' : 'white', // Example of indicating form data
            }}
          >
            <td>{journey.sortIndex}</td> {/* Display Sort Index */}
            <td>{journey.name}</td>
            <td>{journey.description}</td>
            <td>{journey.hasFormData ? 'Yes' : 'No'}</td>
          </tr>
        )}
      </Draggable>
    ));
  };

  return (
    <div className="container">
      <h1 className="mt-5">Product Journey</h1>
      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Group controlId="productType">
              <Form.Label>Select Product Type</Form.Label>
              <Form.Control
                as="select"
                value={selectedProductType}
                onChange={handleProductTypeChange}
              >
                <option value="">Select Product Type</option>
                {productTypes.map((type) => (
                  <option key={type.ProductTypeID} value={type.ProductTypeID}>
                    {type.ProductTypeName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Form className="mb-4">
        <Row>
          <Col>
            <Form.Group controlId="newJourneyName">
              <Form.Label>New Journey Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newJourney.name}
                onChange={handleNewJourneyChange}
                placeholder="Enter journey name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="newJourneyDescription">
              <Form.Label>New Journey Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newJourney.description}
                onChange={handleNewJourneyChange}
                placeholder="Enter journey description"
              />
            </Form.Group>
          </Col>
          <Col className="align-self-end">
            <Button variant="success" onClick={handleCreateNewJourney}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="journeys">
          {(provided) => (
            <Table striped bordered hover {...provided.droppableProps} ref={provided.innerRef}>
              <thead>
                <tr>
                  <th>Sort Index</th> {/* Sort Index Column */}
                  <th>Journey Name</th>
                  <th>Description</th>
                  <th>Form Data Set</th>
                </tr>
              </thead>
              <tbody>
                {renderTableRows()}
                {provided.placeholder}
              </tbody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedJourney?.name} - Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormBuilder data={formData} hide_actions={true} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withAuth(ProductJourneyPage);
