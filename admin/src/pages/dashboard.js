import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardCard from '../components/DashboardCard';
import ProductChart from '../components/ProductChart';
import RecentActivities from '../components/RecentActivities';
import withAuth from '../middleware/withAuth';
// import { fetchProducts } from '../slices/productSlice';
// import { fetchRecentActivities } from '../slices/activitySlice';

const Dashboard = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.items);
//   const recentActivities = useSelector((state) => state.activities.recent);
const products = [];
const recentActivities = [];

//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchRecentActivities());
//   }, [dispatch]);

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col>
          <DashboardCard title="Total Products" value={products.length} />
        </Col>
        <Col>
          <DashboardCard title="Active Products" value={products.filter((p) => p.isActive).length} />
        </Col>
        <Col>
          <DashboardCard title="Recently Added" value={recentActivities.length} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <ProductChart data={products} />
        </Col>
        <Col md={4}>
          <RecentActivities activities={recentActivities} />
        </Col>
      </Row>
    </Container>
  );
};

export default withAuth(Dashboard);
