import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Form, Button, Modal, Table, Row, Col } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axiosInstance from '../interceptors/axiosConfig';
import { setFileInputPreview } from '../utils/fileUtil';

const FormBuilder = dynamic(() => import('./FormBuilder'), { ssr: false });

const ProductJourney = ({ productTypeId }) => {
  const [journeys, setJourneys] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [formData, setFormData] = useState([]);
  const [newJourney, setNewJourney] = useState({ name: '', description: '' });

  // Fetch journeys when the product type ID changes
  useEffect(() => {
    if (productTypeId) {
      axiosInstance.get(`/api/product-journeys/${productTypeId}`).then((response) => {
        setJourneys(response.data);
      }).catch((error) => {
        console.log('Axios error ', error);
      });
    } else {
      setJourneys([]);
    }
  }, [productTypeId]);

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

  const handleJourneyClick = (journey) => {
    setSelectedJourney(journey);
    setFormData(journey.ProductJourneyTemplates?.length > 0 ? JSON.parse(journey.ProductJourneyTemplates[0].FieldTemplate) : []);
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
      await axiosInstance.post(`/api/update-journey-sort`, {
        journeys: updatedItems.map(({ id, sortIndex }) => ({ id, sortIndex })),
      });
    } catch (error) {
      console.error('Error updating journey sort order:', error);
    }
  };

  const handleNewJourneyChange = (e) => {
    setNewJourney({ ...newJourney, [e.target.name]: e.target.value });
  };

  const handleCreateNewJourneyClick = (e) => {
    setShowCreateModal(true);
  }

  const handleCloseCreateModal = (e) => {
    setShowCreateModal(false);
    setNewJourney({ name: '', description: '' });
  }

  const handleCreateNewJourney = async () => {
    if (!newJourney.name || !newJourney.description) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/product-journeys`, {
        ProductTypeID: productTypeId,
        ProductJourneyName: newJourney.name,
        ProductJourneyDescription: newJourney.description,
        ProductJourneyIndex: journeys.length + 1,
        DefaultMessageTemplate: newJourney.defaultMessageTemplate,
        IsVisible: true,
        CreateBy: 1
      });
      setJourneys([...journeys, response.data]);
      setNewJourney({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating new journey:', error);
    }
  };

  const handleSaveTemplate = async () => {
    try {
      console.log(selectedJourney, formData);
      const response = await axiosInstance.post(`/api/product-journey-templates`, {
        ProductJourneyID: selectedJourney.ProductJourneyID,
        FieldTemplate: JSON.stringify(formData),
        CreateBy: 1
      });

      const tmpSelectedJourney = selectedJourney;
      tmpSelectedJourney.ProductJourneyTemplates = [response.data];

      const tempJourneys = journeys;
      tempJourneys.map((journey) => {
          if (journey === selectedJourney) {
            journey.ProductJourneyTemplates = [response.data];
          }
      });
      console.log(tempJourneys);
      setSelectedJourney(tmpSelectedJourney);
      setJourneys(tempJourneys);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating new journey:', error);
    }
  };

  const renderTableRows = () => {
    return journeys.map((journey, index) => (
      <Draggable key={journey.ProductJourneyID} draggableId={journey.ProductJourneyID.toString()} index={index}>
        {(provided) => (
          <>
            <tr
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                ...provided.draggableProps.style,
                cursor: 'pointer',
                backgroundColor: journey.hasFormData ? '#dff0d8' : 'white',
              }}
            >
              <td>{journey.ProductJourneyIndex}</td>
              <td>{journey.ProductJourneyName}</td>
              <td>{journey.ProductJourneyName}</td>
              <td>{journey.ProductJourneyTemplates?.length > 0 ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleCreateNewJourneyClick()}>Edit Journey</button>
                <br />
                <button onClick={() => handleJourneyClick(journey)}>Edit Attributes</button>
              </td>
            </tr>
            <tr>
              <td colSpan="7">
                <b>Message Template</b><br/>
                 {journey.DefaultMessageTemplate}
              </td>
            </tr>
          </>
        )}
      </Draggable>
    ));
  };

  return (
    <div className="container">
      <button onClick={() => handleCreateNewJourneyClick()}>Create New Journey</button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="journeys">
          {(provided) => (
            <Table striped bordered hover {...provided.droppableProps} ref={provided.innerRef}>
              <thead>
                <tr>
                  <th>Sort Index</th>
                  <th>Journey Name</th>
                  <th>Description</th>
                  <th>Attributes</th>
                  <th>Actions</th>
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

      <Modal show={showCreateModal} onHide={handleCloseCreateModal} size="xl">
        <Modal.Header closeButton="closeButton">
          <Modal.Title>Create New Journey</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    placeholder="Enter journey name"/>
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
                    placeholder="Enter journey description"/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="newJourneyDefaultMessageTemplate">
                  <Form.Label>Message Template</Form.Label>
                  <Form.Control
                    type="text"
                    name="defaultMessageTemplate"
                    value={newJourney.defaultMessageTemplate}
                    onChange={handleNewJourneyChange}
                    placeholder="Enter Template"/>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={handleCreateNewJourney}>
                Save
            </Button>
            <Button variant="secondary" onClick={handleCloseCreateModal}>
                Close
            </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{selectedJourney?.ProductJourneyName} - Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormBuilder data={formData} onChange={setFormData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSaveTemplate}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductJourney;
