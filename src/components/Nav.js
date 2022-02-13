/****************************
Treehouse FSJS Techdegree:
Project 7 - React Gallery App
Student: Ryan Agatep
Nav.js - Navigation Component
****************************/

// Imports Libraries
import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
    return(
        <nav className="main-nav">
        <ul>
          <li><NavLink to={'/dogs'}>Dogs</NavLink></li>
          <li><NavLink to={'/cats'}>Cats</NavLink></li>
          <li><NavLink to={'/birds'}>Birds</NavLink></li>
        </ul>
      </nav>
    )
  }

export default Nav; 