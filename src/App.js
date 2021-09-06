import './App.css';
import React, { Component } from 'react';
import Search from './Component/Search/Search'
import Table from './Component/Table/Table';
import Button from './Component/Button/Button'


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '100';


const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`
console.log(url)



class App extends Component {
  constructor(props) {
    super(props);

    this.onClickMe = this.onClickMe.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this)

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }

  setSearchTopStories(result) {
    const { hits, page } = result; const oldHits = page !== 0 ? this.state.result.hits : [];
    const updatedHits = [...oldHits, ...hits];
    this.setState({ result: { hits: updatedHits, page } });
  }

  onDismiss(id) {
    const updateHits = this.state.result.hits.filter(elem => elem.objectID !== id);
    this.setState(
      { result: { ...this.state.result, hits: updateHits } }
    )
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onSearchChange(event) {
    this.setState({
      searchTerm: event.target.value,
    })
  }

  onClickMe() {
    console.log(this);
  }


  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }


  render() {
    console.log(this.state)
    const { searchTerm, result } = this.state;
    const page = (result && result.page) || 0;
    if (!result) { return null; }


    return (
      <div className="page">
        <div className="interactions">
          <Button
            onClick={
              () => this.fetchSearchTopStories(searchTerm, page + 1)}>
            Больше историй
          </Button>
          <Search value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          > <span> Поиск </span> </Search>
        </div>

        {result
          && <Table list={result.hits}
            onDismiss={this.onDismiss}
          />
        }

      </div>
    )
  }
}



export default App;
