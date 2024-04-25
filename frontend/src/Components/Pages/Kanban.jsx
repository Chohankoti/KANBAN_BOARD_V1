import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import { Tabs } from 'antd';
import axios from 'axios';

import { Category } from '../utils/Category';

export default function Kanban() {
    let username = sessionStorage.getItem('username');
    const navigation = useNavigate();
    const [distinctowners, setdistinctowners] = useState([]);
    const [ac, setac] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeTabTop, setActiveTabTop] = useState(null);
    const [activeTabLeft, setActiveTabLeft] = useState(null);
    const prevActiveTabTopRef = useRef();

    useEffect(() => {
        fetchDistinctOwners();
    }, []);

    useEffect(() => {
        if (prevActiveTabTopRef.current !== activeTabTop) {
            fetchAccessControls(activeTabTop?.owner);
            prevActiveTabTopRef.current = activeTabTop;
        }
    }, [activeTabTop]);

    const fetchDistinctOwners = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/accesscontrols/getdistinctownersbyusername/${username}`);
            setdistinctowners(response.data);
            setActiveTabTop(response.data[0]);
        } catch (error) {
            console.error('Error fetching distinct owners:', error);
        }
    };

    const fetchAccessControls = async (owner) => {
        try {
            const response = await axios.get(`http://localhost:8081/accesscontrols/filterbyusername/${owner}`);
            setac(response.data);
            setActiveTabLeft(response.data[0]);
        } catch (error) {
            console.error('Error fetching access controls:', error);
        }
    };


    const AddTask = (category, ccode) => {
        navigation(`../addtask/${category}/${ccode}`);
    }

    const filterbycategoryandccode = async (category, ccode) => {
        try {
            const response = await axios.get(`http://localhost:8081/tasks/filterbycategoryandccode/${category}/${ccode}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };


    return (
        <div className="flex flex-col  text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
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
                    {ac.map((tab, index) => (
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
                            {tab.ccode}
                        </button>
                    ))}
                </div>

                {/* Right Content */}
                <div className="flex flex-col justify-start items-center p-4 w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center">{activeTabTop && activeTabLeft ? `${activeTabTop.owner} Team Project Board of ${activeTabLeft.ccode}` : ''}</h1>
                    {ac.map((acdata, index) => (
                        <div
                            key={index}
                            className={`${activeTabLeft?.id === acdata.id
                                ? "block transition-all ease-in-out duration-700 transition-leave transition-leave-active"
                                : "invisible"
                                }`}
                        >
                            <div className="flex flex-grow justify-center px-10 mt-4 space-x-6 overflow-auto">
                                {Category.map((cat, index) => (
                                    <div key={index} className="w-72">
                                        <div className="flex items-center h-10 px-2">
                                            <span className="block text-sm font-semibold">{cat.title}</span>
                                            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">6</span>
                                            <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                                                onClick={async () => {
                                                    try {
                                                        const tasks = await filterbycategoryandccode(cat.title, activeTabLeft.ccode);
                                                        setTasks(tasks);
                                                    } catch (error) {
                                                        console.error('Error fetching tasks:', error);
                                                    }
                                                }}>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <Cards tasks={tasks} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
