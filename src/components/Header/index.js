import React, { useState } from "react";
import { useEffect } from "react";
import "./index.css";
import UserService from '../../services/UserService';
import { useNavigate } from "react-router-dom";
import MSysLogo from '../../assets/images/msysLogo.png';
import headers from './headers.json'

/**
 * Header With Searchbar
 *
 * @description: Shows a header component with a search bar to input a github username
 * @returns Header Component
 */
function Header({page}) {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    if(path==='signin'){
      UserService.doLogin();
    }
    else if(page ==='logout'){
      UserService.doLogout();
    }
    else{
      localStorage.setItem('position', 'header')
      navigate('../'+ path);
    }
    };

    const getMenu = (menu,index) =>{
      return  <a key={index} className="" href="" onClick={() => navigateTo(menu.key)}>{menu.displayName} </a>
    }
    
       
    useEffect(() => {
       
    }, []);
    return (
        <header >
           <div class="header">
<img alt='logo' className='img-logo' onClick={()=>navigateTo('/')}  src={MSysLogo} style={{height:50,width:200,cursor:"pointer"}}/>
  <div class="header-right">
{headers.map((header)=> header.page===page && header.menu.map((menu, index)=> 
{
  return (
    ((process.env.REACT_APP_isKeycloak === menu.keyCloak) || menu.keyCloak===null ) && <a key={index} className="action-link"  onClick={() => navigateTo(menu.key)}>{menu.displayName} </a>
  
  
  )}))}

    {/* <a class="active" href="" onClick={() => navigateTo('signup')}>Sign Up</a>
    
    {process.env.REACT_APP_isKeycloak === 'true' &&   <a href=""  onClick={() => UserService.doLogin()}>Log In</a> }
    {process.env.REACT_APP_isKeycloak === 'false' &&   <a href="" onClick={() => navigateTo('dashboard')} >Dashboard</a> } */}
  </div>
</div> </header>
    );
}

export default Header;
