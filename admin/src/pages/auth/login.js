import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { extractTokenData } from '../../utils/jwtUtil';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = extractTokenData('FullName');
      if (name) {
        router.push('/dashboard');
      }
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    try {
      console.log(e);
      const response = await axios.post(`/api/auth/login`, credentials);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('refresh-token', response.data.refreshToken);
      setError('');
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data.error || 'Invalid credentials');
    }
  };

  return (
    <>
      <div className="form-group">
        <input type="text" name="username" placeholder="Enter Username..." onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      </div>
      <button type="button" className="login-btn" onClick={handleSubmit}>Login</button>
      <button className="website-btn">Register</button>
      <p>
        <Link href="/forgot-password">Forgot Password?</Link>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default Login;
