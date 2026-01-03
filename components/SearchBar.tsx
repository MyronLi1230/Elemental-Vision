import React, { useState, useCallback } from 'react';
import { SearchIcon, AtomIcon } from './Icons';
import { SearchProps } from '../types';

const SearchBar: React.FC<SearchProps> = ({ onSearch, isLoading, language }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  }, [term, onSearch]);

  const placeholder = language === 'zh' 
    ? "输入元素名称 (如: 铁, Carbon)..." 
    : "Enter element name (e.g., Gold, Carbon)...";

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 relative z-10">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="pl-4 text-gray-400">
             {isLoading ? (
               <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />
             ) : (
               <AtomIcon className="h-6 w-6 text-indigo-400" />
             )}
          </div>
          <input
            type="text"
            className="w-full bg-transparent text-white p-4 pl-3 focus:outline-none text-lg font-medium placeholder-gray-500"
            placeholder={placeholder}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !term.trim()}
            className="p-4 bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SearchIcon className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
