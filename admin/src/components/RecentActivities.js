import React from 'react';
import { ListGroup } from 'react-bootstrap';

const RecentActivities = ({ activities }) => {
  return (
    <div className="recent-activities">
      <h5>Recent Activities</h5>
      <ListGroup>
        {activities.map((activity, index) => (
          <ListGroup.Item key={index}>{activity.description}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default RecentActivities;
