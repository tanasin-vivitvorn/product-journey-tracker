import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { extractTokenData } from '../utils/jwtUtil';

const Layout = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [profileMenuActive, setProfileMenuActive] = useState(false);
  const [fullName, setFullName] = useState(''); // State for fullName
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = extractTokenData('FullName');
      setFullName(name || '');
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const toggleProfileMenu = () => {
    setProfileMenuActive(!profileMenuActive);
  };

  const handleLogout = () => {
    router.push('/auth/login');
  };

  const getMenuClass = (path) => (router.pathname === path ? 'active' : '');

  return (
    <>
      <div className="header">
        <div className="banner">
          <div className="logo">
            <img src="/images/logo.png" alt="Logo" />
          </div>
          <div className="product-name">
            <h1>
              <span style={{ color: '#f8f9fa' }}>SOCIAL SHARING</span>
              <span style={{ color: '#343a40' }}> &amp; RESOURCE MANAGEMENT</span>
            </h1>
          </div>
          <div className="profile-section">
            <div className="profile-icon" onClick={toggleProfileMenu}>
              <i className="fa fa-user-circle fa-3"></i>
              <span>{fullName}</span>
            </div>
            {profileMenuActive && (
              <div className="profile-menu">
                <Link href="/edit-profile">Edit Profile</Link>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <ul className="navbar-nav">
          <li className={`nav-item ${getMenuClass('/dashboard')}`}>
            <Link href="/dashboard"><i className="fa fa-home fa-3"></i>&nbsp;Home</Link>
          </li>
          <li className={`nav-item ${getMenuClass('/product')}`}>
            <Link href="/product/product"><i className="fa fa-box-open fa-3"></i>&nbsp;<span>Product</span></Link>
          </li>
          <li className={`nav-item ${getMenuClass('/product/product-type')}`}>
            <Link href="/product/product-type"><i className="fa fa-tags fa-3"></i>&nbsp;&nbsp;Product Type</Link>
          </li>
          <li className={`nav-item ${getMenuClass('/supplier/supplier')}`}> 
            <Link href="/supplier/supplier"><i className="fa fa-truck fa-3"></i>&nbsp;Supplier</Link>
          </li>
          <li className={`nav-item ${getMenuClass('/supplier/supplier-template')}`}> 
            <Link href="/supplier/supplier-template"><i className="fa fa-file-alt fa-3"></i>&nbsp;&nbsp;&nbsp;Supplier Template</Link>
          </li>
          <li className={`nav-item ${getMenuClass('/auth/user')}`}> 
            <Link href="/supplier/supplier-template"><i className="fa fa-user fa-3"></i>&nbsp;&nbsp;&nbsp;User</Link>
          </li>
        </ul>
      </div>
      <div className={`hamburger`} onClick={toggleSidebar}>
        ☰
      </div>
      <div className={`main-content ${sidebarActive ? 'shifted' : ''}`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
