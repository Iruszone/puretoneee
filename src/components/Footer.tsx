
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-6 border-t border-gray-100 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} PureTone AI. All rights reserved.
        </div>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-xs text-gray-500 hover:text-pt-purple transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-gray-500 hover:text-pt-purple transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-xs text-gray-500 hover:text-pt-purple transition-colors">
            Documentation
          </a>
          <a href="#" className="text-xs text-gray-500 hover:text-pt-purple transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
