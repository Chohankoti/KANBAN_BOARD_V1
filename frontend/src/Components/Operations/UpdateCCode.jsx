import React, { useState } from 'react';
import axios from 'axios';

export default function UpdateCCode({ code, onClose }) {
  const [updatedCode, setUpdatedCode] = useState({id:code.id, ccode: code.ccode, tag: code.tag, owner: code.owner });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCode((prevCode) => ({ ...prevCode, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      await axios.put(`http://localhost:8081/ccodes/${code.id}`, updatedCode);
      onClose();
    } catch (error) {
      console.error('Error updating code:', error);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-screen w-screen bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Update Community Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="ccode" className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <input
              type="text"
              name="ccode"
              id="ccode"
              value={updatedCode.ccode}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter code..."
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tag" className="block text-sm font-medium text-gray-700">
              Tag
            </label>
            <input
              type="text"
              name="tag"
              id="tag"
              value={updatedCode.tag}
              onChange={handleChange}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter tag..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
