import React from 'react';
import dynamic from 'next/dynamic';
import 'react-form-builder2/dist/app.css';

const ReactFormBuilder = dynamic(
  () => import('react-form-builder2').then((mod) => mod.ReactFormBuilder),
  { ssr: false }
);

const FormBuilder = ({ data, onChange }) => {
  return <ReactFormBuilder data={data} onChange={onChange} />;
};

export default FormBuilder;
