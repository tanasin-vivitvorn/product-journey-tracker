import dynamic from 'next/dynamic';
import 'react-form-builder2/dist/app.css';
import CustomFileWidget from '../components/CustomFileWidget'; 

const ReactFormGenerator = dynamic(
  () => import('react-form-builder2').then((mod) => mod.ReactFormGenerator),
  { ssr: false }
);

const customFieldMap = {
  file: CustomFileWidget,
};

const FormGenerator = ({ data, answer_data, onSubmit }) => {
  return <ReactFormGenerator 
    data={data} 
    answer_data={answer_data}
    onSubmit={onSubmit} 
    custom={customFieldMap}/>;
};

export default FormGenerator;
