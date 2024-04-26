import React from 'react'
export default function Cards({ task }) {
    console.log("Card task",task)
    
    return (
     
        <div class="flex flex-col pb-2 overflow-hidden">
                    <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100" draggable="true">
                        <span className={`flex items-center h-6 px-3 text-xs font-semibold  rounded-full ${task.priority === "High" ? "bg-pink-100 text-pink-500" : task.priority === "Low" ? "bg-green-100 text-green-500" : "bg-yellow-100 text-yellow-500"}`}>{task.priority}</span>
                        <h4 className="mt-3 text-sm font-medium">{task.title}</h4>
                        <p className="mt-3 text-sm font-small">
                            {task.tag.length > 10 ? `${task.tag.substring(0, 10)}...` : task.tag}.
                        </p>
                        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
                            <div className="flex items-center ">
                                <svg className="w-4 h-4 text-gray-300 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-1 leading-none">{task.deadline}</span>
                            </div>
                            <div className="relative flex items-center  w-5 h-3 ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                                    <path fill="#f5ce85" d="M4.913 21.803L6.716 20 10.236 23.065 8.214 25.088 2.451 27.549z"></path>
                                    <path fill="#967a44" d="M6.74,20.683l2.764,2.407l-1.575,1.575l-4.527,1.933l1.933-4.511L6.74,20.683 M6.693,19.316 l-2.202,2.202L1.5,28.499l6.999-2.989l2.469-2.469L6.693,19.316L6.693,19.316z"></path>
                                    <path fill="#36404d" d="M3.198 24.544L1.502 28.501 5.469 26.807z"></path>
                                    <path fill="#f78f8f" d="M22.47,4.236l1.556-1.556c0.439-0.44,1.024-0.682,1.646-0.682s1.207,0.242,1.646,0.682 c0.907,0.908,0.907,2.385,0,3.293l-1.556,1.556L22.47,4.236z"></path>
                                    <path fill="#c74343" d="M25.672,2.499c0.488,0,0.948,0.19,1.293,0.536C27.31,3.38,27.5,3.839,27.5,4.327 c0,0.488-0.19,0.948-0.536,1.293l-1.202,1.202l-2.586-2.586l1.202-1.202C24.724,2.689,25.183,2.499,25.672,2.499 M25.672,1.499 c-0.724,0-1.448,0.276-2,0.828l-1.909,1.909l4,4l1.909-1.909c1.105-1.105,1.105-2.895,0-4v0 C27.119,1.775,26.395,1.499,25.672,1.499L25.672,1.499z"></path>
                                    <g>
                                        <path fill="#ffeea3" d="M8.788,24.513c-0.04-0.068-0.087-0.134-0.142-0.199c-0.232-0.272-0.552-0.445-0.954-0.517 c-0.18-0.846-0.85-1.288-1.465-1.441C6.12,21.84,5.822,21.48,5.451,21.265L21.157,5.549l3.293,3.293L8.788,24.513z"></path>
                                        <path fill="#ba9b48" d="M21.158,6.256l2.586,2.586L8.816,23.778c-0.177-0.151-0.411-0.296-0.717-0.394 c-0.262-0.75-0.855-1.201-1.457-1.423c-0.099-0.293-0.251-0.54-0.438-0.742L21.158,6.256 M21.157,4.842L4.491,21.518 c0,0,0.005,0,0.016,0c0.145,0,1.264,0.04,1.264,1.275c0,0,1.469,0.046,1.469,1.466c1.461,0,1.26,1.25,1.26,1.25L25.157,8.842 L21.157,4.842L21.157,4.842z"></path>
                                    </g>
                                    <g>
                                        <path fill="#d9e7f5" d="M22.139 3.859H25.485V8.516H22.139z" transform="rotate(-45.012 23.81 6.187)"></path>
                                        <path fill="#788b9c" d="M23.348,4.065l2.586,2.586L24.275,8.31l-2.586-2.586L23.348,4.065 M23.348,2.651l-3.073,3.073l4,4 l3.073-3.073L23.348,2.651L23.348,2.651z"></path>
                                    </g>
                                </svg>
                            </div>
                            <div className="flex items-center w-5 h-3 ml-4">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 100 100">
                                    <path fill="#f37e98" d="M25,30l3.645,47.383C28.845,79.988,31.017,82,33.63,82h32.74c2.613,0,4.785-2.012,4.985-4.617L75,30"></path>
                                    <path fill="#f15b6c" d="M65 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S65 36.35 65 38zM53 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S53 36.35 53 38zM41 38v35c0 1.65-1.35 3-3 3s-3-1.35-3-3V38c0-1.65 1.35-3 3-3S41 36.35 41 38zM77 24h-4l-1.835-3.058C70.442 19.737 69.14 19 67.735 19h-35.47c-1.405 0-2.707.737-3.43 1.942L27 24h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h54c1.657 0 3-1.343 3-3S78.657 24 77 24z"></path>
                                    <path fill="#1f212b" d="M66.37 83H33.63c-3.116 0-5.744-2.434-5.982-5.54l-3.645-47.383 1.994-.154 3.645 47.384C29.801 79.378 31.553 81 33.63 81H66.37c2.077 0 3.829-1.622 3.988-3.692l3.645-47.385 1.994.154-3.645 47.384C72.113 80.566 69.485 83 66.37 83zM56 20c-.552 0-1-.447-1-1v-3c0-.552-.449-1-1-1h-8c-.551 0-1 .448-1 1v3c0 .553-.448 1-1 1s-1-.447-1-1v-3c0-1.654 1.346-3 3-3h8c1.654 0 3 1.346 3 3v3C57 19.553 56.552 20 56 20z"></path>
                                    <path fill="#1f212b" d="M77,31H23c-2.206,0-4-1.794-4-4s1.794-4,4-4h3.434l1.543-2.572C28.875,18.931,30.518,18,32.265,18h35.471c1.747,0,3.389,0.931,4.287,2.428L73.566,23H77c2.206,0,4,1.794,4,4S79.206,31,77,31z M23,25c-1.103,0-2,0.897-2,2s0.897,2,2,2h54c1.103,0,2-0.897,2-2s-0.897-2-2-2h-4c-0.351,0-0.677-0.185-0.857-0.485l-1.835-3.058C69.769,20.559,68.783,20,67.735,20H32.265c-1.048,0-2.033,0.559-2.572,1.457l-1.835,3.058C27.677,24.815,27.351,25,27,25H23z"></path>
                                    <path fill="#1f212b" d="M61.5 25h-36c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h36c.276 0 .5.224.5.5S61.776 25 61.5 25zM73.5 25h-5c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h5c.276 0 .5.224.5.5S73.776 25 73.5 25zM66.5 25h-2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h2c.276 0 .5.224.5.5S66.776 25 66.5 25zM50 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v25.5c0 .276-.224.5-.5.5S52 63.776 52 63.5V38c0-1.103-.897-2-2-2s-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2v-3.5c0-.276.224-.5.5-.5s.5.224.5.5V73C53 74.654 51.654 76 50 76zM62 76c-1.654 0-3-1.346-3-3V47.5c0-.276.224-.5.5-.5s.5.224.5.5V73c0 1.103.897 2 2 2s2-.897 2-2V38c0-1.103-.897-2-2-2s-2 .897-2 2v1.5c0 .276-.224.5-.5.5S59 39.776 59 39.5V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C65 74.654 63.654 76 62 76z"></path>
                                    <path fill="#1f212b" d="M59.5 45c-.276 0-.5-.224-.5-.5v-2c0-.276.224-.5.5-.5s.5.224.5.5v2C60 44.776 59.776 45 59.5 45zM38 76c-1.654 0-3-1.346-3-3V38c0-1.654 1.346-3 3-3s3 1.346 3 3v35C41 74.654 39.654 76 38 76zM38 36c-1.103 0-2 .897-2 2v35c0 1.103.897 2 2 2s2-.897 2-2V38C40 36.897 39.103 36 38 36z"></path>
                                </svg>
                            </div>
                            <img className="w-6 h-6 ml-auto rounded-full" src="https://randomuser.me/api/portraits/women/26.jpg" alt="user" />
                        </div>
                    </div>
        </div>
    );
}
