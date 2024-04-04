import React, { useState, useEffect } from 'react';
import { BsFillTrash3Fill, BsFillPencilFill, BsPlus } from 'react-icons/bs';
import axios from 'axios';
import UpdateCCode from '../Operations/UpdateCCode';

export default function CCode() {
  let username = sessionStorage.getItem('username');
  const [codes, setCodes] = useState([]);
  const [newCode, setNewCode] = useState({ ccode: '', tag: '', owner: username });
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [editingCode, setEditingCode] = useState(null);

  const handleEdit = (code) => {
    setEditingCode(code);
    console.log("Editing data: ", code)
    setShowShareOptions(true);
  };

  const handleCloseUpdate = () => {
    setEditingCode(null);
    setShowShareOptions(false);
    fetchCodes();
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/ccodes/filterbyowner/${username}`);
      setCodes(response.data);
    } catch (error) {
      console.error('Error fetching codes:', error);
    }
  };

  const deleteCode = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/ccodes/${id}`);
      fetchCodes();
    } catch (error) {
      console.error('Error deleting code:', error);
    }
  };

  const addCode = async () => {
    try {
      console.log('Adding code:', newCode);
      await axios.post('http://localhost:8081/ccodes', newCode);
      console.log('Code added successfully');
      fetchCodes();
      setNewCode({ ccode: '', tag: '' });
    } catch (error) {
      console.error('Error adding code:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCode((prevCode) => ({ ...prevCode, [name]: value }));
  };

  const renderCodes = () => {
    return codes.map((code, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{code.ccode}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{code.tag}</div>
        </td>
        <td className="whitespace-nowrap text-left text-sm font-medium">
          {!showShareOptions && (
            <button
              onClick={() => handleEdit(code)}
              className="text-indigo-600 hover:text-indigo-900 mr-1"
            >
              <BsFillPencilFill />
            </button>
          )}
          <div className="inline-block">
            <button onClick={() => deleteCode(code.id)} className="text-red-600 hover:text-red-900">
              <BsFillTrash3Fill className="h-5 w-5" />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <div className="px-10 mt-3">
        <h1 className="text-2xl font-bold flex flex-grow justify-center items-center">Community Code</h1>
      </div>
      <div className="flex justify-center items-center overflow-x-auto mt-5">
        <div className="inline-block w-1/2 rounded-lg overflow-hidden">
          <div className="flex mb-4">
            <input
              type="text"
              name="ccode"
              value={newCode.ccode}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Code"
            />
            <input
              type="text"
              name="tag"
              value={newCode.tag}
              onChange={handleChange}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Tag"
            />
            <button onClick={addCode} className="mr-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <BsPlus className="h-5 w-5 mr-2" />
              Add
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Code
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Tag
                </th>
                <th
                  scope="col"
                  className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderCodes()}
            </tbody>
          </table>
          {showShareOptions && <UpdateCCode code={editingCode} onClose={handleCloseUpdate} />}
        </div>
      </div>
    </div>
  );
}
