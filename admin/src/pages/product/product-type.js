import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductTypes, createProductType} from '../../redux/slices/productTypeSlice';
import {Modal, Button, Form, InputGroup} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import withAuth from '../../middleware/withAuth';
import dynamic from 'next/dynamic';
import ProductJourney from '../../components/ProductJourney';
import axiosInstance from '../../interceptors/axiosConfig';

const FormBuilder = dynamic(
    () => import('../../components/FormBuilder'),
    { ssr: false }
  );

const ProductType = () => {
    const dispatch = useDispatch();
    const productTypes = useSelector((state) => state.productTypes.items);

    const [showModal, setShowModal] = useState(false);
    const [showModalJourney, setShowModalJourney] = useState(false);
    const [showModalTemplate, setShowModalTemplate] = useState(false);
    const [newProductType, setNewProductType] = useState('');
    const [editProductType, setEditProductType] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [formData, setFormData] = useState([]);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchProductTypes());
    }, [dispatch]);

    useEffect(() => {
        console.log('formData:',formData);
    }, [formData]);

    useEffect(() => {
        setFilteredItems(productTypes);
    }, [productTypes]);

    const handleShowModalJourney = (item = null) => {
        setSelectedProductType(item.ProductTypeID);
        setShowModalJourney(true);
    };
    const handleCloseModalJourney= () => setShowModalJourney(false);

    const handleShowModalTemplate = (item = null) => {
        setSelectedProductType(item.ProductTypeID);
        if (item.ProductTemplates?.length > 0) {
            const template = item.ProductTemplates[0];
            setFormData(template?.FieldTemplate? JSON.parse(template?.FieldTemplate): []);
        }
        setShowModalTemplate(true);
    };
    const handleCloseModalTemplate = () => setShowModalTemplate(false);

    const handleShowModal = (productType = null) => {
        setEditProductType(productType);
        setNewProductType(
            productType
                ? productType.ProductTypeName
                : ''
        );
        setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    const handleCreateOrEditProductType = () => {
        if (editProductType) {
            // Handle editing logic here (e.g., dispatch an update action)
        } else {
            dispatch(createProductType(newProductType));
        }
        setNewProductType('');
        setEditProductType(null);
        handleCloseModal();
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const newSelectedItems = currentItems.map((item) => item.ProductTypeID);
            setSelectedItems(newSelectedItems);
        } else {
            setSelectedItems([]);
        }
    };

    const handleSave = () => {
        console.log('selectedProductType:', selectedProductType);
        console.log('Form Data Saved:', formData);
        axiosInstance.post('/api/product-templates', { 
          ProductTypeID: selectedProductType,
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

    const handleSelectItem = (e, id) => {
        if (e.target.checked) {
            setSelectedItems([
                ...selectedItems,
                id
            ]);
        } else {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        }
    };

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
    };

    const handleSearch = () => {
        const filtered = productTypes.filter(
            (productType) => productType.ProductTypeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
        setCurrentPage(0); // Reset to the first page after searching
    };

    const offset = currentPage * itemsPerPage;
    const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

    const renderTableRows = () => {
        return currentItems.map((productType) => (
            <tr key={productType.ProductTypeID}>
                <td>
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(productType.ProductTypeID)}
                        onChange={(e) => handleSelectItem(e, productType.ProductTypeID)}/>
                </td>
                <td>{productType.ProductTypeID}</td>
                <td>{productType.ProductTypeName}</td>
                <td onClick={() => handleShowModal(productType)}>Edit Product Type</td>
                <td onClick={() => handleShowModalTemplate(productType)}>click</td>
                <td onClick={() => handleShowModalJourney(productType)}>click</td>
            </tr>
        ));
    };

    return (
        <div className="container mt-5">
            {/* <div className="header"> */}
                <h1>Product Type Management</h1>
            {/* </div> */}
            <div className="search-bar d-flex justify-content-between mb-3">
                <InputGroup className="w-50 search-bar">
                    <Form.Control
                        type="text"
                        placeholder="Search Product Types..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}/>
                    <Button variant="primary" onClick={handleSearch} size="sm">
                        <i class="fa fa-search"></i>
                    </Button>
                </InputGroup>
                <div>
                    <Button variant="danger" className="me-2" size="sm">
                        <i class="fa fa-trash"></i>
                    </Button>
                    <Button variant="primary" onClick={() => handleShowModal()} size="sm">
                        <i class="fa fa-plus"></i>
                    </Button>
                </div>
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedItems.length === currentItems.length && currentItems.length > 0}/>
                        </th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Edit Product Type</th>
                        <th>Edit Product Template</th>
                        <th>Edit Product Journey</th>
                    </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </table>

            <ReactPaginate
                previousLabel={'← Previous'}
                nextLabel={'Next →'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}/> {/* Modal for creating/editing product type */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton="closeButton">
                    <Modal.Title>
                        {
                            editProductType
                                ? <><i class="fa fa-edit"></i> Edit Product Type</>
                                : <><i class="fa fa-plus"></i> Create Product Type</>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formProductTypeName">
                            <Form.Label>Product Type Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <span>Name</span>
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product type name"
                                    value={newProductType}
                                    onChange={(e) => setNewProductType(e.target.value)}/>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal} size="sm">
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateOrEditProductType} size="sm">
                        {
                            editProductType
                                ? 'Save Changes'
                                : 'Create'
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalTemplate} onHide={handleCloseModalTemplate} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Form Builder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <FormBuilder data={formData} onChange={setFormData} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalTemplate}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalJourney} onHide={handleCloseModalJourney} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Product Journey</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProductJourney productTypeId={selectedProductType} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalJourney}>
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

export default withAuth(ProductType);
