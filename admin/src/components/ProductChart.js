import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ProductChart = ({ data }) => {
  const chartData = data.map((product) => ({
    name: product.name,
    value: product.value, // Adjust according to your data structure
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#ff7a00" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductChart;
