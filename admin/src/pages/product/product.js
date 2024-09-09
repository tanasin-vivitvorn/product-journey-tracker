import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchProducts, createProduct } from '../../redux/slices/productSlice';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import withAuth from '../../middleware/withAuth';

const Product = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const products = useSelector((state) => state.products?.items || []);
  const [showModal, setShowModal] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredItems(products);
  }, [products]);

  const goToCreatePage = () => {
    router.push(`/product/product-create`);
  };

  const goToEditPage = (productID) => {
    router.push(`/product/product-create?productID=${productID}`);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleCreateOrEditProduct = () => {
    if (editProduct) {
      // Handle editing logic here (e.g., dispatch an update action)
    } else {
      dispatch(createProduct(newProductName));
    }
    setNewProductName('');
    setEditProduct(null);
    handleCloseModal();
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSelectedItems = currentItems.map((item) => item.ProductID);
      setSelectedItems(newSelectedItems);
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (e, id) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = () => {
    if (!Array.isArray(products)) {
      console.error('Products is not an array:', products);
      setFilteredItems([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(filteredItems) ? filteredItems.slice(offset, offset + itemsPerPage) : [];
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);  // Ensure pageCount is defined

  const renderTableRows = () => {
    return currentItems.map((product) => (
      <tr key={product.ProductID} onClick={() => goToEditPage(product.ProductID)}>
        <td>
          <input
            type="checkbox"
            checked={selectedItems.includes(product.ProductID)}
            onChange={(e) => handleSelectItem(e, product.ProductID)}
          />
        </td>
        <td>{product.ProductID}</td>
        <td>{product.ProductName}</td>
      </tr>
    ));
  };

  return (
    <div className="container mt-5">
      <h1>Product Management</h1>
      <div className="d-flex justify-content-between mb-3">
                <InputGroup className="w-50">
                    <Form.Control
                        type="text"
                        placeholder="Search Product..."
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
                    <Button variant="primary" onClick={() => goToCreatePage()} size="sm">
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
                checked={selectedItems.length === currentItems.length && currentItems.length > 0}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
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
        activeClassName={'active'}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fa fa-edit"></i> {editProduct ? 'Edit Product' : 'Create Product'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="fa fa-edit"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} size="sm">
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateOrEditProduct} size="sm">
            {editProduct ? 'Save Changes' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withAuth(Product);
