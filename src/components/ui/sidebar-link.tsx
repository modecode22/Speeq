import { NavLink, useLocation } from 'react-router-dom'
import React from 'react'
const SidebarLink = ({children , name , to }:{children:React.ReactNode , name:string ,to:string}) => {
  let location = useLocation();
  return (
      <NavLink
        to={to}
        className={`${
          location.pathname === to
            ? "text-light-50 bg-primary-500 hover:bg-primary-400"
            : "text-light-900 hover:text-light-500 hover:bg-dark-400"
        } group w-full h-10 truncate transition-colors duration-75 text-sm rounded-full flex items-center px-5 gap-2`}
      >
        <strong
          className={`${
            location.pathname === to ? "text-light-50" : "text-primary-500"
          }  w-5 h-5 flex justify-center items-center`}
        >
          {children}
        </strong>
        {name}
      </NavLink>
    );
}

export default SidebarLink;