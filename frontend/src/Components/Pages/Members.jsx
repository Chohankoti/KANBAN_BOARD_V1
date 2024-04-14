import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsUnlockFill, BsFillLockFill } from 'react-icons/bs';
import { BsFillTrash3Fill, BsFillPencilFill } from 'react-icons/bs';
import { toast, Bounce } from 'react-toastify';
import UpdateMember from '../Operations/UpdateMember';

export default function Members() {
  const [members, setMembers] = useState([]);
  const [codes, setCodes] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // Initialize activeTab as null initially

  let username = sessionStorage.getItem('username');

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
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
    fetchCodes();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/accesscontrols/filterbyowner/${username}`);
      setMembers(response.data);
      console.log('Members: ', members);
    } catch (error) {
      console.log('Error fetching members: ', error);
    }
  };

  const fetchCodes = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/ccodes/filterbyowner/${username}`);
      setCodes(response.data);
      if (response.data.length > 0) {
        setActiveTab(response.data[0]); // Set activeTab after codes have been updated
      }
    } catch (error) {
      console.error('Error fetching codes:', error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  

  const deleteCode = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/accesscontrols/${id}`);
      toast.success('Successfully Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      fetchMembers();
    } catch (error) {
      console.error('Error deleting code:', error);
    }
  };

  const handlefilter = (ccode) => {
    return members
      .filter((member) => member.ccode === ccode)
      .map((data, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
          <td className="px-4 py-2 font-medium whitespace-nowrap">{data.empid}</td>
          <td className="px-4 py-2 font-medium whitespace-nowrap">{data.username}</td>
          <td className="px-4 py-2 font-medium  whitespace-nowrap">{data.company}</td>
          <td className="px-4 py-2 font-medium whitespace-nowrap">
            {data.createaccess ? <BsUnlockFill className="font-bold h-4 w-4" /> : <BsFillLockFill className="font-bold h-4 w-4" />}
          </td>
          <td className="px-4 py-2 whitespace-nowrap">
            {data.updateaccess ? <BsUnlockFill className="font-bold h-4 w-4" /> : <BsFillLockFill className="font-bold h-4 w-4" />}
          </td>
          <td className="px-4 py-2 whitespace-nowrap">
            {data.deleteaccess ? <BsUnlockFill className="font-bold h-4 w-4" /> : <BsFillLockFill className="font-bold h-4 w-4" />}
          </td>
          <td className="px-4 py-2 whitespace-nowrap">
            <button onClick={() => handleEdit(data)} className="text-indigo-600 hover:text-indigo-900 mr-3">
              <BsFillPencilFill />
            </button>
            <button onClick={() => deleteCode(data.id)} className="text-red-600 hover:text-red-900">
              <BsFillTrash3Fill className="h-5 w-5" />
            </button>
          </td>
        </tr>
      ));
  };

  return (
    <div className="flex flex-col h-screen text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <div className="px-10 mt-3">
        <h1 className="text-2xl font-bold flex justify-center items-center">Community Members of </h1>
      </div>
      <div>
        <div className="flex justify-center mt-4 py-1">
          {codes.map((tab, index) => (
            <button
              key={index}
              className={`${activeTab?.id === tab.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} max-w-[100px] w-full py-2 rounded-md mx-1 font-semibold`}
              onClick={() => handleTabClick(tab)}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab.ccode}
            </button>
          ))}
        </div>
        <div className="flex justify-center overflow-y-hidden items-center transition-enter transition-enter-active">
          {codes.map((data, index) => (
            <div
              key={index}
              className={`${activeTab?.id === data.id ? 'block transition-all ease-in-out duration-700 transition-leave transition-leave-active' : 'invisible'}`}
            >
              <div className="flex flex-col justify-center items-center overflow-x-auto mt-5">
                <div className="mb-4">
                  <Link to={`/addmember/${activeTab.ccode}`} className="text-green-600 hover:text-indigo-900">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add</button>
                  </Link>
                </div>
                {members.filter((member) => member.ccode === activeTab.ccode).length === 0 ? (
                  <p className="text-center text-red-500 font-semibold m-10">No community members added for this code</p>
                ) : (
                  <div className="inline-block w-full rounded-lg overflow-hidden pb-8">
                    <div className="flex mb-4">
                      <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Employee ID</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">UserName</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Create Access</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Update Access</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Delete Access</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {handlefilter(data.ccode)}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>
      {showShareOptions && <UpdateMember code={editingCode} onClose={handleCloseUpdate} />}
    </div>
  );
}
