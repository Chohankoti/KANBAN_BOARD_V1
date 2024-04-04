import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateMember({ code, onClose }) {
    const [updatedCode, setUpdatedCode] = useState({
        empid: '',
        username: '',
        company: '',
        ccode: '',
        owner: '',
        updateaccess: false,
        deleteaccess: false,
        createaccess: false,
        tag: '',
    });

    useEffect(() => {
        if (code) {
            setUpdatedCode({
                empid: code.empid.toString(), // Assuming empid is a number, convert it to string
                username: code.username || '',
                company: code.company || '',
                ccode: code.ccode.toString(), // Assuming ccode is a number, convert it to string
                owner: code.owner || '',
                updateaccess: code.updateaccess || false,
                deleteaccess: code.deleteaccess || false,
                createaccess: code.createaccess || false,
                tag: code.tag || '',
            });
        }
    }, [code]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCode((prevCode) => ({
          ...prevCode,
          [name]: value === "true" ? true : false, // Convert value to boolean
        }));
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8081/accesscontrols/${code.id}`, updatedCode);
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
                <h2 className="text-2xl font-bold mb-4">Update Community Member</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="empid" className="block text-sm font-medium text-gray-700">
                            Employee ID
                        </label>
                        <input
                            type="text"
                            name="empid"
                            id="empid"
                            value={updatedCode.empid}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter employee ID..."
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={updatedCode.username}
                            onChange={handleChange}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Enter username..."
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Create Access</label>
                        <div className="mt-1 flex items-center">
                            <input
                                type="radio"
                                id="createAccessTrue"
                                name="createaccess"
                                value="true"
                                checked={updatedCode.createaccess === true}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                            />
                            <label htmlFor="createAccessTrue" className="ml-2 text-sm text-gray-900">
                                Accessed
                            </label>
                            <input
                                type="radio"
                                id="createAccessFalse"
                                name="createaccess"
                                value="false"
                                checked={updatedCode.createaccess === false}
                                onChange={handleChange}
                                className="ml-4 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                            />
                            <label htmlFor="createAccessFalse" className="ml-2 text-sm text-gray-900">
                                Unaccessed
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Update Access</label>
                        <div className="mt-1 flex items-center">
                            <input
                                type="radio"
                                id="updateAccessTrue"
                                name="updateaccess"
                                value="true"
                                checked={updatedCode.updateaccess === true}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                            />
                            <label htmlFor="updateAccessTrue" className="ml-2 text-sm text-gray-900">
                                Accessed
                            </label>
                            <input
                                type="radio"
                                id="updateAccessFalse"
                                name="updateaccess"
                                value="false"
                                checked={updatedCode.updateaccess === false}
                                onChange={handleChange}
                                className="ml-4 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                            />
                            <label htmlFor="updateAccessFalse" className="ml-2 text-sm text-gray-900">
                                Unaccessed
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Delete Access</label>
                        <div className="mt-1 flex items-center">
                            <input
                                type="radio"
                                id="deleteAccessTrue"
                                name="deleteaccess"
                                value="true"
                                checked={updatedCode.deleteaccess === true}
                                onChange={handleChange}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                            />
                            <label htmlFor="deleteAccessTrue" className="ml-2 text-sm text-gray-900">
                                Accessed
                            </label>
                            <input
                                type="radio"
                                id="deleteAccessFalse"
                                name="deleteaccess"
                                value="false"
                                checked={updatedCode.deleteaccess === false}
                                onChange={handleChange}
                                className="ml-4 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-full"
                            />
                            <label htmlFor="deleteAccessFalse" className="ml-2 text-sm text-gray-900">
                                Unaccessed
                            </label>
                        </div>
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
