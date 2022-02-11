/**
 * This the first version of App.js.
 * This calls all endpoints when the page loads.
 * I am not sure if that's efficient so I am not using this.
 * But I included this file to show my work.
 * And to remind myself that I could build this way.
 */

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

  state = {
    randomPics: [],
    dogPics: [],
    catPics: [],
    birdPics: [],
    loading: true,
  }

  componentDidMount(){
    this.performSearch();
    /**
     * From https://masteringjs.io/tutorials/axios/all
     */
    const reqDogs = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`);
    const reqCats = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`);
    const reqBirds = axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=birds&per_page=24&format=json&nojsoncallback=1`);

    axios.all([reqDogs, reqCats, reqBirds])
      .then(axios.spread((...responses) => {
        this.setState({dogPics: responses[0].data.photos.photo, loading: false});
        this.setState({catPics: responses[1].data.photos.photo, loading: false});
        this.setState({birdPics: responses[2].data.photos.photo, loading: false});
        }))
      .catch(error => {
        console.log('Error fetching and parsing data', error)
    })
  }

  performSearch = (query = 'pets') =>{
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
            <Route exact path="/" render={() =><PhotoContainer data={this.state.randomPics}/>}/>
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