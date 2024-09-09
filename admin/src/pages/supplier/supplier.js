import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { fetchSuppliers, fetchSuppliersByID } from '../../redux/slices/supplierSlice';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import withAuth from '../../middleware/withAuth';

const Supplier = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const suppliers = useSelector((state) => state.suppliers.suppliers || []);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    console.log(suppliers);
    setFilteredItems(suppliers);
  }, [suppliers]);

  const goToCreatePage = () => {
    router.push(`/supplier/supplier-create`);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSelectedItems = currentItems.map((item) => item.SupplierID);
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
    console.log(suppliers);
    if (!Array.isArray(suppliers)) {
      console.error('Suppliers is not an array:', suppliers);
      setFilteredItems([]);
      return;
    }

    const filtered = suppliers.filter((supplier) =>
      supplier.SupplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
    setCurrentPage(0);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = Array.isArray(filteredItems) ? filteredItems.slice(offset, offset + itemsPerPage) : [];
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);  // Ensure pageCount is defined
  console.log(currentItems);
  const renderTableRows = () => {
    return currentItems.map((supplier) => (
      <tr key={supplier.SupplierID} onClick={() => goToCreatePage(supplier)}>
        <td>
          <input
            type="checkbox"
            checked={selectedItems.includes(supplier.SupplierID)}
            onChange={(e) => handleSelectItem(e, supplier.SupplierID)}
          />
        </td>
        <td>{supplier.SupplierID}</td>
        <td>{supplier.SupplierName}</td>
        <td style={{ fontSize: '0.85rem' }}>{supplier.CreateAt}</td>
        <td style={{ fontSize: '0.85rem' }}>{supplier.UpdateAt}</td>
      </tr>
    ));
  };

  return (
    <div className="container mt-5">
      <h1>Supplier Management</h1>
      <div className="d-flex justify-content-between mb-3">
        <InputGroup className="w-50">
            <Form.Control
                type="text"
                placeholder="Search Supplier..."
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
            <th>Create At</th>
            <th>Update At</th>
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
    </div>
  );
};

export default withAuth(Supplier);
