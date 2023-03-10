import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser } from "react-icons/fa";

import { BiLogOut} from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
const routes = [
  {
    path: "/",
    name: "Admin Details",
    icon: <FaHome />,
  },
  {
    path: "",
    name: "Add page",
    icon: <FaUser />,
    subRoutes: [
      {
        path: "/addpages",
        name: "Add pages ",
        icon: <FaUser />,
      },
      {
        path: "/teams",
        name: "Teams",
        icon: <FaLock />,
      }
    ],
  }
  
];



const routesanother = [
  {
    path: "/",
    name: "About",
    icon: <FaHome />,
  }
]



const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <>
      <div className="main-container position-fixed">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "50px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section position-fixed">
            <div className="bars sm:ml-[-2px]">
              <FaBars onClick={toggle} />
            </div>
            <div>
              <a href="/" class="text-white sm:invisible md:visible lg:visible"><pre> Dashboard     </pre>
                
              </a>
            </div>
          </div>

          <section className="routes py-12">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon ">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>


          <section className="routes py-1">
            {/* <h1 class="mx-10 lg:px-3 md:px-3 sm:mx-10  ">Interfaces</h1>
            {routesanother.map((routea, index) => {
              if (routea.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={routea}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }
              return (
                <NavLink
                  to={routea.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon ">{routea.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {routea.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })} */}

            
            
          </section>



        </motion.div>
        <main>{children}</main>
      </div>
    </>
  );
};
export default SideBar;
