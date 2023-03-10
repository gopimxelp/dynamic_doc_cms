import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./pages/Dashboard";
import Addpages from "./pages/Addpages";
import User from "./pages/User";
import Navbar from "./components/Navbar";

import  {connect} from 'react-redux';
import { IncAction } from "./actions";
import { DecAction } from "./actions";


const App = ({local_variable,IncAction,DecAction}) => {
  return (
    <div>
      <BrowserRouter>
        <div className=" w-[100%] flex flex-row">
          <div className="w-[10%] h-[10%]">
            <SideBar />
          </div>
          <div class="w-[90%] flex flex-col">
            <div className="w-[100%]">
              <Navbar />
            </div>
            <div className="h-[90%] pt-20 px-40 lg:px-10 lg:px-none text-center flex flex-wrap">
              <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/addpages" element={<Addpages />}></Route>
                <Route path="/user" element={<User />}></Route>
                
              </Routes>
            </div>
          </div>
        </div>
        {/* <div class="h-[100vh]">
          <h1>{local_variable} var</h1>
          <button onClick={IncAction} class="bg-red-200">Increment</button>
          <button onClick={DecAction}>Decrement</button>
        </div> */}
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps=state=>({
  local_variable:state
})

export default connect(mapStateToProps,{IncAction,DecAction})(App);
