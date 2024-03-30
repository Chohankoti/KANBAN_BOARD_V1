import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



export default function Members() {
  const [Members, setMembers] = useState([]);
  const [cc, setcc] = useState([]);

  const user = 'chohan';

  useEffect(() => {
    fetchMembers();
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/accesscontrols/filterbyowner/${user}`)
      setMembers(response.data);
      console.log('Members: ', Members);
      
    } catch (error) {
      console.log('Erro fetching members: ', error);
    }
  }


  return (
    <div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">

      <div className="px-10 mt-3">
        <h1 className="text-2xl font-bold flex flex-grow justify-center items-center">Community Members of </h1>
      </div>

      <div className="flex flex-col justify-center items-center overflow-x-auto mt-5">
        <div className='mb-4'>
        <Link to="/addmember" className="text-green-600 hover:text-indigo-900">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add
          </button>
        </Link>
        </div>       
        <div className="inline-block w-3/4 rounded-lg overflow-hidden">
          <div className="flex mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Employee ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    UserName
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Create Access
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Update Access
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Delete Access
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
