import React from 'react';
import { NavLink } from 'react-router-dom';
import "../style/nav.css";

const NavBar = props => {
    return( 
        <>
        <div class="header">
            <h1 id="name">Customer Service Portal</h1>
            <div className="toggle-btn">
                <div class="dropdown">
                    <button class="dropbtn">Nav Menu
                        <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                    <a href="http://localhost:3000/PortalHome">Portal Home</a>
                    <a href="http://localhost:3000/UserList">User List</a>
                    <a href="http://localhost:3000/AddSubscriber">Add Subscriber</a>
                    <a href="http://localhost:3000/SearchUser">Search User</a>
                    </div>
                </div>
            </div>
            <div id="nav">
                <ul className='navList'>
                    <li>
                        <NavLink to="PortalHome" >Portal Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="UserList" >User List</NavLink>
                    </li>
                    <li>
                        <NavLink to="AddSubscriber" >Add Subscriber</NavLink>
                    </li>
                    <li>
                        <NavLink to="SearchUser" >Search Users</NavLink>
                    </li>
                </ul>
            </div>
        </div>
        </>
    );
}

export default NavBar;