/***********************************************************
Treehouse FSJS Techdegree:
Project 7 - React Gallery App
Student: Ryan Agatep
Photo.js - Presentational component containing the template
  that displays each picture
************************************************************/

import React from 'react';

const Photo = (props) => {
    return(
      <li>
        <img src={props.url} alt={props.title} />
      </li>
    )
}

export default Photo;