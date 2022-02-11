/**
 * Contains the wrapping UL element that displays the list of pictures
 * via the Photo component.
 * Receives the data from App.js and responsible 
 * for only how the list of pictures looks
 */

// Imports other components
import React from 'react';
import Photo from './Photo';
import NoPics from './NoPics';

const PhotoContainer = (props) => {
    /**
     * 'props' is how components talk to each other
     * 'data' is from App.js
     */
    console.log(props.data.length);
    const results = props.data
    // Condition rendering based on results returned
    let pictures;
    if (results.length > 0) {
        pictures = results.map(picture => (
            // Pass url property of each picture
            <Photo url={`https://live.staticflickr.com/${picture.server}/${picture.id}_${picture.secret}.png`}
            title={picture.title}
            // Specifies unique key prop
            key={picture.id} />
        ));
    } else {
        pictures = <NoPics />;
    }

    return(
    <div className="photo-container">
        <h2>Results</h2>
        <ul>
            {/** Renders the pictures variable */}
            {pictures}
        </ul>
    </div>
    )
}

export default PhotoContainer;