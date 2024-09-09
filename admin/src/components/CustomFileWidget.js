import React, { useState } from 'react';
import { FileWidget } from 'react-form-builder2';

const CustomFileWidget = (props) => {
  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          handleChange(e);
          if (props.onChange) props.onChange(e);
        }}
      />
      {filePreview && (
        <div>
          <img src={filePreview} alt="File Preview" style={{ width: '100px', height: '100px' }} />
        </div>
      )}
    </div>
  );
};

export default CustomFileWidget;
