import React from 'react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold text-gray-800">PALMYRA</span>
        </Link>
        <ul className="flex space-x-6 items-center">
          <li>
            <Link href="/products">
              <span className="text-gray-600 hover:text-gray-800">Products</span>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <span className="text-gray-600 hover:text-gray-800">About Us</span>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <span className="text-gray-600 hover:text-gray-800">Contact</span>
            </Link>
          </li>
          <li>
            <Link href="/cart">
              <span className="text-gray-600 hover:text-gray-800 flex items-center">
                <FiShoppingCart className="w-6 h-6" />
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
