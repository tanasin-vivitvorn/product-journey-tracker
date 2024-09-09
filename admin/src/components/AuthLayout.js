import React from 'react';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-image">
        </div>
        <div className="auth-form">
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
