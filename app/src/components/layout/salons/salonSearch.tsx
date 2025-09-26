'use client'

import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SalonSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'in', location);
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200 mb-6" style={{marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', width: '100vw'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center gap-3">
          <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 px-4 py-3">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search salons, services, or stylists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-sm font-medium"
          />
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 px-4 py-3 min-w-0 w-64">
          <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Location or salon name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none text-sm font-medium w-full min-w-0"
          />
          </div>

          <Button
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg font-medium text-sm transition-colors duration-200 flex-shrink-0 h-12"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonSearch;