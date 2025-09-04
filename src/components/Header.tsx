
import React from 'react';
import { Mic } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-8 flex items-center justify-between bg-white/90 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center">
          <Mic className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-pt-dark">PureTone</h1>
          <p className="text-xs text-gray-500">Advanced Voice Analysis</p>
        </div>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <a href="#" className="text-sm font-medium text-pt-dark hover:text-pt-purple transition-colors">Dashboard</a>
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-pt-purple transition-colors">Voice Library</a>
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-pt-purple transition-colors">Analytics</a>
        <a href="#" className="text-sm font-medium text-gray-500 hover:text-pt-purple transition-colors">Settings</a>
      </nav>

      {/* <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
          JD
        </div>
      </div> */}
    </header>
  );
};

export default Header;
