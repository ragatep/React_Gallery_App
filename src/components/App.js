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
import {dogs, cats, birds} from './data.js'

export default class App extends Component {

  state = {
    randomPics: [],
    loading: true,
  }

  componentDidMount(){
    this.performSearch();
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
            <Route path="/dogs" render={() =><PhotoContainer data={dogs}/>}/>
            <Route path="/cats" render={() =><PhotoContainer data={cats}/>}/>
            <Route path="/birds" render={() =><PhotoContainer data={birds}/>}/>
            <Route component={NotFound}/>
          </Switch>
        }
        </div>
      </Router>
    )
  }
}