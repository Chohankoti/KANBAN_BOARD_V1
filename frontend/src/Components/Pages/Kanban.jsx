import React, { useState, useEffect } from 'react';
import CardGrid from './CardGrid';
import Cards from './Cards';
import { Tabs } from 'antd';
import axios from 'axios';

export default function Kanban() {
    let username = sessionStorage.getItem('username');
    const [distinctowners, setdistinctowners] = useState([]);
    const [ac, setac] = useState([]);

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
    const [activeTabTop, setActiveTabTop] = useState(null);
    const [activeTabLeft, setActiveTabLeft] = useState(null);

    useEffect(() => {
        fetchDistinctOwners();
        fetchAccessControls();        
    }, [])

    const fetchDistinctOwners = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/accesscontrols/getdistinctownersbyusername/${username}`);
            setdistinctowners(response.data);
            setActiveTabTop(response.data[0]); // Set initial value for activeTabTop
        } catch (error) {
            console.error('Error fetching distinct owners:', error);
        }
    }
    
    const fetchAccessControls = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/accesscontrols/filterbyowner/${username}`);
            setac(response.data);
            setActiveTabLeft(CardData[0]); // Set initial value for activeTabLeft
        } catch (error) {
            console.error('Error fetching access controls:', error);
        }
    }



    return (
        <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            {/* Top Tabs */}
            <div className="flex justify-center mt-4 py-1">
                {distinctowners.map((tab, index) => (
                    <button
                        key={index}
                        className={`${activeTabTop?.id === tab.id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-black"
                            } px-4 py-2 rounded-md mx-1 font-semibold`}
                        onClick={() => setActiveTabTop(tab)}
                        role="tab"
                        aria-selected={activeTabTop === tab}
                        style={{ width: `${tab.length * 10 + 100}px` }} // Adjust the width dynamically
                    >
                        {tab.owner}
                    </button>
                ))}

            </div>

            {/* Content */}
            <div className="flex flex-grow">
                {/* Left Tabs */}
                <div className="w-1/12 flex flex-col items-start justify-start p-4">
                    {CardData.map((tab, index) => (
                        <button
                            key={index}
                            className={`${activeTabLeft?.id === tab.id
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-black"
                                } w-full py-2 rounded-md mb-2 font-semibold`}
                            onClick={() => setActiveTabLeft(tab)}
                            role="tab"
                            aria-selected={activeTabLeft === tab}
                        >
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Right Content */}
                <div className="flex flex-col justify-start items-center p-4 w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center">{activeTabTop && activeTabLeft ? `${activeTabTop.owner} Team Project Board of ${activeTabLeft.name}` : ''}</h1>
                    {CardData.map((data, index) => (
                        <div
                            key={index}
                            className={`${activeTabLeft?.id === data.id
                                ? "block transition-all ease-in-out duration-700 transition-leave transition-leave-active"
                                : "invisible"
                                }`}
                        >
                            <div className="flex flex-grow justify-center px-10 mt-4 space-x-6 overflow-auto">
                                <div className="w-72">
                                    <div className="flex items-center h-10 px-2">
                                        <span className="block text-sm font-semibold">To Do</span>
                                        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">6</span>
                                        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Cards />
                                </div>

                                <div className="w-72">
                                    <div className="flex items-center h-10 px-2">
                                        <span className="block text-sm font-semibold">To Do</span>
                                        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">6</span>
                                        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Cards />
                                </div>

                                <div className="w-72">
                                    <div className="flex items-center h-10 px-2">
                                        <span className="block text-sm font-semibold">To Do</span>
                                        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">6</span>
                                        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Cards />
                                </div>

                                <div className="w-72">
                                    <div className="flex items-center h-10 px-2">
                                        <span className="block text-sm font-semibold">To Do</span>
                                        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">6</span>
                                        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <Cards />
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
