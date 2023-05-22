import React, { useState, useEffect } from 'react';
import './index.css';
import { RiMenuLine, RiLayoutGridFill, RiBillFill, RiCurrencyFill } from 'react-icons/ri';

import { useNavigate } from 'react-router-dom';

function SideBar() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(true);
  const sideBarCollapse = async() => setSideBarCollapsed(!sideBarCollapsed);

  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate('../' + path);
  }


  useEffect(() => {}, []);

  return (
    <>
      <div className={sideBarCollapsed ? 'col-auto col-md-1 col-xl-1 px-sm-1 px-0 bg-dark':'col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'} >
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
               
          <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li className="nav-item" style={{paddingBottom:'15px'}} onClick={()=>sideBarCollapse()} title="Menu">
              <a href="" className="nav-link align-middle px-0">
                <RiMenuLine style={{width:'2rem',height:'2rem'}} /> <span  className={sideBarCollapsed ? 'ms-1 isSideBarCollapsed':'ms-1 isSideBarNotCollapsed'}>Menu</span>
              </a>
            </li>
            <li className="nav-item" style={{paddingBottom:'15px'}} onClick={()=>navigateTo('dashboard')}>
              <a href="" className="nav-link align-middle px-0" title="Dashboard">
                <RiLayoutGridFill style={{width:'2rem',height:'2rem'}} /> <span  className={sideBarCollapsed ? 'ms-1 isSideBarCollapsed':'ms-1 isSideBarNotCollapsed'}>Dashboard</span>
              </a>
            </li>
            <li className="nav-item" style={{paddingBottom:'15px'}} onClick={()=>navigateTo('wallet')}>
              <a href="" className="nav-link align-middle px-0" title="Transfer">
                <RiCurrencyFill style={{width:'2rem',height:'2rem', textAlign:'center'}} /> <span  className={sideBarCollapsed ? 'ms-1 isSideBarCollapsed':'ms-1 isSideBarNotCollapsed'}>Transfer</span>
              </a>
            </li>

            <li className="nav-item" style={{paddingBottom:'15px'}} onClick={()=>navigateTo('transaction')}>
              <a href="" className="nav-link align-middle px-0" title="History">
                <RiBillFill style={{width:'2rem',height:'2rem'}} /> <span  className={sideBarCollapsed ? 'ms-1 isSideBarCollapsed':'ms-1 isSideBarNotCollapsed'}> History</span>
              </a>
            </li>
                    
          </ul>
               
        </div>
      </div>
       

    
    </>
  );
}

export default SideBar;
