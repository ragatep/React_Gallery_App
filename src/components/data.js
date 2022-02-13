/*********************************
Treehouse FSJS Techdegree:
Project 7 - React Gallery App
Student: Ryan Agatep
data.js - not used in this project
**********************************/

// Imports
import axios from 'axios'
import apiKey from './config.js';
// Variables
let pets ={};
let dogs = {};
let cats = {};
let birds = {};
/** Enpoints for all three routes*/
// default
axios(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=pets&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
        pets = response.data.photos.photo
    }) 
    .catch(error => {
        console.log(error)
    })
// dogs
axios(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
    .then(response => {
        dogs = response.data.photos.photo
    }) 
    .catch(error => {
        console.log(error)
    })
// cats
axios(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
.then(response => {
    cats = response.data.photos.photo
}) 
.catch(error => {
    console.log(error)
})
// birds
axios(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=birds&per_page=24&format=json&nojsoncallback=1`)
.then(response => {
    birds = response.data.photos.photo
}) 
.catch(error => {
    console.log(error)
})
//** Sends the results to App.js */
export {pets, dogs, cats, birds}