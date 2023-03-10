import React from 'react';
import { CgMenuGridO } from 'react-icons/cg';






const Navbar = () => {
  return (


    <nav class="navbar navbar-expand-lg position-fixed w-[100%] z-40" id="mainNav">
      

      <div class="w-[80%] h-[4.5vh] flex ">
        {/* <input type="text" class="bg-gray-200 w-55 h-10  md:w-12/12 lg:w-9/12 text-gray-500 border-none rounded-2 px-3 mx-10 lg:mx-20 searchbar" placeholder='Search'></input> */}
        {/* <span class="input-group-addon">
          <i class="fa fa-search"></i>
        </span> */}
        {/* <div className="bars text-white">
          <span><CgMenuGridO size={30} /></span>
        </div> */}
        <h1 class="text-white text-center flex justify-center px-[40%]">Dynamic Documentation</h1>
      </div>

      {/* <div class='w-[20%] flex flex-row flex-start'>
        <button class="w-[100%]">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nAxslMxxJrHpG18SYlUUxa31n8vrlQuREnSvalg&s" alt="image1" class="w-10  h-10 rounded-full"></img>
        </button>
        
        
      </div> */}


     


    </nav>


  )



}

export default Navbar
