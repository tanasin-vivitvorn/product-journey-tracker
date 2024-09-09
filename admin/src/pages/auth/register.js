import React from 'react';
import Link from 'next/link';

const Register = () => {
  return (
    <>
      <form>
        <div className="form-group">
          <input type="text" placeholder="Enter Username..." />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Enter Email..." />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit" className="login-btn">Register</button>
        <p>
          <Link href="/login">Already have an account? Login</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
