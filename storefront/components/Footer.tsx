import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} PALMYRA. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;