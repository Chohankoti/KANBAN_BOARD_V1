import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';

export default function MemberForm() {
  const {ccode} = useParams();
  let username = sessionStorage.getItem('username');
    const navigation = useNavigate();

  const [formData, setFormData] = useState({
    empid: '',
    username: '',
    company: '',
    ccode: ccode,
    owner: username,
    updateaccess: false,
    deleteaccess: false,
    createaccess: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.post('http://localhost:8081/accesscontrols',formData)
    .then((response)=>{
      toast.success("Member Added Successfully", {
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
    })
    navigation('/members')
  };

  return (
    <div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <div className="px-10 mt-3">
        <h1 className="text-2xl font-bold flex flex-grow justify-center items-center">Add Community Member</h1>
      </div>
    <div className="w-full max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empid">
              Employee ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="empid"
              name="empid"
              type="number"
              placeholder="Employee ID"
              value={formData.empid}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
              Company
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="company"
              name="company"
              type="text"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ccode">
              Community Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ccode"
              name="ccode"
              type="number"
              placeholder="CCode"
              value={formData.ccode}
              onChange={handleChange}
              readOnly
            />
          </div>
         
          <div className="col-span-2">
  <label className="block text-gray-700 text-sm font-bold mb-2">Access Control</label>
  <div className="flex flex-wrap">
    <div className="flex items-center mr-8 mb-2">
      <input
        className="mr-2 leading-tight"
        id="updateaccess"
        name="updateaccess"
        type="checkbox"
        checked={formData.updateaccess}
        onChange={handleCheckboxChange}
      />
      <label className="text-sm" htmlFor="updateaccess">
        Update Access
      </label>
    </div>
    <div className="flex items-center mr-8 mb-2">
      <input
        className="mr-2 leading-tight"
        id="deleteaccess"
        name="deleteaccess"
        type="checkbox"
        checked={formData.deleteaccess}
        onChange={handleCheckboxChange}
      />
      <label className="text-sm" htmlFor="deleteaccess">
        Delete Access
      </label>
    </div>
    <div className="flex items-center mb-2">
      <input
        className="mr-2 leading-tight"
        id="createaccess"
        name="createaccess"
        type="checkbox"
        checked={formData.createaccess}
        onChange={handleCheckboxChange}
      />
      <label className="text-sm" htmlFor="createaccess">
        Create Access
      </label>
    </div>
  </div>
</div>


        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
