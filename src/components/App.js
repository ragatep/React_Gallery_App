/****************************
Treehouse FSJS Techdegree:
Project 7 - React Gallery App
Student: Ryan Agatep
App.js - App Component
****************************/

// Imports Libraries
import React, { Component } from 'react';
import axios from 'axios';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
} from 'react-router-dom';
// Imports components
import apiKey from './config';
import PhotoContainer from './PhotoContainer';
import Nav from './Nav'
import Loading from './Loading';
import SearchForm from './SearchForm';
import NotFound from './NotFound';

export default class App extends Component {
  // Variables' state when the page is loaded
  state = {
    randomPics: [],
    animalsPics: [],
    dogPics: [],
    catPics: [],
    birdPics: [],
    loading: true,
  }
  // After all the elements of the page is rendered correctly, this method is called
  componentDidMount(){
    /**
     * From https://masteringjs.io/tutorials/axios/all
     * Gets all endpoints when the page loads
     * And updates state to the results
     */
    const reqPets = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=animals&per_page=24&format=json&nojsoncallback=1`);
    const reqDogs = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`);
    const reqCats = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`);
    const reqBirds = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=birds&per_page=24&format=json&nojsoncallback=1`);

    axios.all([reqPets, reqDogs, reqCats, reqBirds])
      .then(axios.spread((...responses) => {
        this.setState({animalsPics: responses[0].data.photos.photo, loading: false});
        this.setState({dogPics: responses[1].data.photos.photo, loading: false});
        this.setState({catPics: responses[2].data.photos.photo, loading: false});
        this.setState({birdPics: responses[3].data.photos.photo, loading: false});
        }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
    })
  }
  // Search Method
  performSearch = (query) =>{
    this.setState({loading: true});
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => 
        this.setState({
          // Updates the state to the results
          randomPics: response.data.photos.photo,
          // Data has been fetched so Loading state is false
          loading: false,
        }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      })
    }
  // Render Method
  render() {
    return(
      <Router>
        <div className="container">
        <SearchForm onSearch={this.performSearch}/>
        <Nav />
        {
          (this.state.loading) 
          ? <Loading />
          :
          <Switch>
            <Route exact path="/" render={() =><PhotoContainer data={this.state.animalsPics}/>}/>
            {/* {URL Parameter} */}
            <Route exact path="/search/:query" render={() =><PhotoContainer data={this.state.randomPics}/>}/>
            <Route path="/dogs" render={() =><PhotoContainer data={this.state.dogPics}/>}/>
            <Route path="/cats" render={() =><PhotoContainer data={this.state.catPics}/>}/>
            <Route path="/birds" render={() =><PhotoContainer data={this.state.birdPics}/>}/>
            <Route component={NotFound}/>
          </Switch>
        }
        </div>
      </Router>
    )
  }
}