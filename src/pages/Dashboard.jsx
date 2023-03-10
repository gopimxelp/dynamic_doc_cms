import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaCalendar } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div>
      <div class= "flex text-start">
      <div class="w-10/12">
        <h1 className='font-bold'>Hi ,Welcome...........</h1>
        <p>Here's what's happening with your business today.</p>
      </div>
      <div class="w-2/12">
        <Dropdown>
          <Dropdown.Toggle id="dropdown" class="text-black bg-blue-200"> 
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>


    </div>
    <div class="w-[100%]  my-10 ">
        <div class="flex w-[100%]">
            <div class="w-3/12 border-2">
              <button class="w-[100%] h-30vh bg-red-100 text-center py-12 px-10">
                <h1>Teams</h1>
                <p>8</p>
              </button>

            </div>
            <div class="w-3/12 border-2">
              <button class="w-[100%] h-30vh bg-red-200 text-center py-12 px-10">
                <h1>Teams</h1>
                <p>8</p>
              </button>
              
            </div>
            <div class="w-3/12 border-2">
              <button class="w-[100%] h-30vh bg-red-300 text-center py-12 px-10">
                <h1>Teams</h1>
                <p>8</p>
              </button>
              
            </div>
        </div>
    </div>
  </div>
    
  )
}

export default Dashboard
