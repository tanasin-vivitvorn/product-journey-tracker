import React from 'react';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <>
      <form>
        <div className="form-group">
          <input type="email" placeholder="Enter Email..." />
        </div>
        <button type="submit" className="login-btn">Reset Password</button>
        <p>
          <Link href="/login">Back to Login</Link>
        </p>
      </form>
    </>
  );
};

export default ForgotPassword;
