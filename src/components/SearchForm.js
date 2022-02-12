import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';


class SearchForm extends Component {
  
    state = {
        // Initializes the default state with values from the search textbox
            searchText: ''
        }
    // Updates the searchText state
    onSearchChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    //
    handleSubmit = (e) => {
        e.preventDefault();
        /**
         * Invokes the onSearch function that fetches the data
         * Then passes the state back to performSearch(query) from the ref
         */
            let userQuery = this.query.value;
            let path = `/search/${userQuery}`;
            this.props.onSearch(userQuery);
            this.props.history.push(path);
            console.log(path);
            e.currentTarget.reset();
    }
    //** Troubleshooting this section of code*/
    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {
            if(this.props.location.pathname.includes("/search")){ 
                const query = this.props.location.pathname.replace("/search/", "");
                this.props.onSearch(query);
                console.log(prevProps.location.pathname)
                console.log(this.props.location.pathname)
            } 
        } else 
            {console.log(prevProps.location.pathname) 
                console.log(this.props.location.pathname)}
    }

    render() {  
        return (
            // Calls the handleSubmit function
            <form className="search-form" onSubmit={this.handleSubmit} >
            <label className="is-hidden" htmlFor="search"></label>
                <input type="search" 
                    onChange={this.onSearchChange}
                    name="search" 
                    /**
                    * Access the value of the DOM element input field directly
                    * Takes a callback argument 'input'
                    */
                    ref={(input) => this.query = input }
                    placeholder="Search..." />
                <button type="submit" id="submit" className="search-button">
                    <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
            </form>      
        );
    }
}

export default withRouter (SearchForm);