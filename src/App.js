import './App.css';
import React, { Component } from 'react';
import Search from './Component/Search/Search'
import Table from './Component/Table/Table'



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
    this.onSearchChange = this.onSearchChange.bind(this)

    this.state = {
      list,
      searchTerm: ''
    }
  }

  onDismiss(id) {
    const updatedList = this.state.list.filter(elem => elem.objectID !== id)
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
  render() {
    const { searchTerm, list } = this.state;


    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange} > <span> Поиск </span> </Search>
          <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
        </div>
      </div>
    )
  }
}



export default App;
