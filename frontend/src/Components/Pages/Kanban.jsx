import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from './Cards';
import { Tabs } from 'antd';
import axios from 'axios';

import { Category } from '../utils/Category';
import UpdateTask from '../Operations/UpdateTask';

export default function Kanban() {
    let username = sessionStorage.getItem('username');
    const navigation = useNavigate();
    const [distinctowners, setdistinctowners] = useState([]);
    const [ac, setac] = useState([]);
    const [task, settask] = useState([]);
    const [activeTabTop, setActiveTabTop] = useState(null);
    const [activeTabLeft, setActiveTabLeft] = useState(null);
    const prevActiveTabTopRef = useRef();


    const [toggle, settoggle] = useState(false);
    const [editingCode, setEditingCode] = useState(null);

    const handleEdit = (code) => {
        setEditingCode(code);
        settoggle(true);
    };

    const handleCloseUpdate = () => {
        setEditingCode(null);
        settoggle(false);
        fetchTasks(activeTabLeft);
    };

    useEffect(() => {
        fetchDistinctOwners();
    }, []);

    useEffect(() => {
        if (prevActiveTabTopRef.current !== activeTabTop) {
            fetchAccessControls(activeTabTop?.owner);
            prevActiveTabTopRef.current = activeTabTop;
        }
    }, [activeTabTop]);

    useEffect(() => {
        if (activeTabLeft) {
            fetchTasks(activeTabLeft);
        }
    }, [activeTabLeft]);


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

    const fetchTasks = async (tab) => {
        try {
            const response = await axios.get(`http://localhost:8081/tasks/filterbyccode/${tab.ccode}`);
            settask(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    const filtertasks = (category) => {
        return task.filter((task) => task.category === category);
    }

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8081/tasks/${taskId}`);
            fetchTasks(activeTabLeft);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };


    const AddTask = (category, ccode) => {
        navigation(`../addtask/${category}/${ccode}`);
    }


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
                            onClick={() => { setActiveTabLeft(tab); fetchTasks(tab) }}
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
                            <div className="flex flex-grow justify-center h-screen px-10 mt-4 space-x-6 overflow-auto">
                                {Category.map((cat, index) => (
                                    <div key={index} className="w-72">
                                        <div className="flex items-center h-10 px-2">
                                            <span className="block text-sm font-semibold">{cat.title}</span>
                                            <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">6</span>
                                            <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                                                onClick={() => AddTask(cat.title, activeTabLeft.ccode)}>
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex flex-col pb-2 overflow-hidden">
                                            {filtertasks(cat.title).length > 0 ? (
                                                filtertasks(cat.title).map((taskItem, index) => (
                                                    <Cards key={index} task={taskItem} onDelete={deleteTask} />
                                                ))
                                            ) : (
                                                <p className="text-center text-red-500 font-semibold m-10">No Task is Assigned</p>
                                            )}
                                        </div>
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
