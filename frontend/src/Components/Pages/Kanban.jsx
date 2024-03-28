import React from 'react'
import CardGrid from './CardGrid'
import { Tabs } from 'antd'

export default function Kanban() {
    return (
        <div class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
            <div class="px-10 mt-6">
                <h1 class="text-2xl font-bold flex flex-grow justify-center items-center">Team Project Board</h1>
            </div>
            <div className='ml-3'>
            <Tabs>
                <Tabs.TabPane tab="31265" key="31265">
                    <Tabs tabPosition='left'>
                        <Tabs.TabPane tab="131265" key="131265">
                        <div class="flex flex-grow justify-center px-10 mt-4 space-x-6 overflow-auto">
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <div class="flex-shrink-0 w-6"></div>
                        </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="131162" key="131162">
                        <div class="flex flex-grow justify-center px-10 mt-4 space-x-6 overflow-auto">
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <div class="flex-shrink-0 w-6"></div>
                        </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="131266" key="131266">
                        <div class="flex flex-grow justify-center px-10 mt-4 space-x-6 overflow-auto">
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <div class="flex-shrink-0 w-6"></div>
                        </div>
                        </Tabs.TabPane>
                    </Tabs>
                </Tabs.TabPane>
                <Tabs.TabPane tab="31162" key="31162">
                    <Tabs tabPosition='left'>
                        <Tabs.TabPane tab="231265" key="231265">
                        <div class="flex flex-grow justify-center px-10 mt-4 space-x-6 overflow-auto">
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <div class="flex-shrink-0 w-6"></div>
                        </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="231162" key="231162">
                        <div class="flex flex-grow justify-center px-10 mt-4 space-x-6 overflow-auto">
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <div class="flex-shrink-0 w-6"></div>
                        </div>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="231266" key="231266">
                        <div class="flex flex-grow justify-center px-10 mt-4 space-x-6 overflow-auto">
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <CardGrid/>
                            <div class="flex-shrink-0 w-6"></div>
                        </div>
                        </Tabs.TabPane>
                    </Tabs>
                </Tabs.TabPane>
            </Tabs>
            </div>
    </div>
    )
}
