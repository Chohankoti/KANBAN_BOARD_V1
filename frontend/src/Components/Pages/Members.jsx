import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Members() {
  const [Members, setMembers] = useState([]);
  const [cc, setcc] = useState([]);

  const user = 'chohan';

  const CardData = [
    {
      name: "31265",
      id: 1,
      desc: "The Dell Inspiron series is geared towards everyday computing and provides a good balance of performance, making them suitable for students, home users, and small businesses.",
      img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
    },
    {
      name: "31162",
      id: 2,
      desc: "Lenovo's G Series laptops are affordable devices.These laptops are known for striking a balance between performance and price, making them an attractive option for budget-conscious users. ",
      img: "https://images.unsplash.com/photo-1542598953-41310c43f54b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
    {
      name: "31266",
      id: 3,
      desc: "MacBooks are known for their seamless integration with other Apple devices and services, creating a comprehensive ecosystem that enhances productivity and convenience.",
      img: "https://images.unsplash.com/photo-1533986690673-c50390c01cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    },
  ];
  const [activeTab, setActiveTab] = useState(CardData[0]);


  useEffect(() => {
    fetchMembers();
  }, [activeTab])

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/accesscontrols/filterbyowner/${user}`)
      setMembers(response.data);
      console.log('Members: ', Members);

    } catch (error) {
      console.log('Error fetching members: ', error);
    }
  }


  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">

      <div className="px-10 mt-3">
        <h1 className="text-2xl font-bold flex justify-center items-center">Community Members of </h1>
      </div>

      <div>
        <div className="flex justify-center mt-4 py-1">
          {CardData.map((tab, index) => (
            <button
              key={index}
              className={`${activeTab?.id === tab.id
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black"
                } max-w-[100px] w-full py-2 rounded-md mx-1 font-semibold`}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="flex justify-center overflow-y-hidden items-center transition-enter transition-enter-active">
          {CardData.map((data, index) => {
            return (
              <div
                key={index}
                className={`${activeTab?.id === data.id
                  ? "block transition-all ease-in-out duration-700 transition-leave transition-leave-active"
                  : "invisible"
                  }`}
              >
                <div className="flex flex-col justify-center items-center overflow-x-auto mt-5">
                  <div className='mb-4'>
                    <Link to="/addmember" className="text-green-600 hover:text-indigo-900">
                      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add
                      </button>
                    </Link>
                  </div>
                  <div className="inline-block w-full rounded-lg overflow-hidden">
                    <div className="flex mb-4">
                      <table className="w-full divide-y divide-gray-200">
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
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                        {data.name}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
