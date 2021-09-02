import './App.css';
import React, { Component } from 'react';
import Search from './Component/Search/Search'
import Table from './Component/Table/Table'


const DEFAULT_QUERY = 'redux';


const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}${PATH_SEARCH}${DEFAULT_QUERY}`
console.log(url)

const list = [{
  title: 'React', url: 'https://reactjs.org/', author: 'Jordan Walke', num_comments: 3, points: 4, objectID: 0,
},
{
  title: 'Redux', url: 'https://redux.js.org/', author: 'Dan Abramov, Andrew Clark', num_comments: 2, points: 5, objectID: 1,
},

];


class App extends Component {
  constructor() {
    super();
    this.onClickMe = this.onClickMe.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);

    this.state = {
      list,
      result: null,
      searchTerm: DEFAULT_QUERY
    }
  }

  setSearchTopStories(result) {
    this.setState({ result });
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(elem => elem.objectID !== id);
    const updateHits = this.state.result.hits.filter(elem => elem.objectID !== id);
    this.setState(
      { list: updatedList }
    )
  }

  onSearchChange(event) {
    this.setState({
      list: list,
      searchTerm: event.target.value,
    })
  }

  onClickMe() {
    console.log(this);
  }


  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }


  render() {
    console.log(this.state)
    const { searchTerm, result } = this.state;
    if (!result) { return null; }


    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} > <span> Поиск </span> </Search>
          <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
        </div>
      </div>
    )
  }
}



export default App;
