import React, { Component } from 'react';
import './App.css';
import Form from './components/Form'
import Recipes from './components/Recipes'

const API_KEY = 'fa58b435cf95279d48fade806d1006db'

class App extends Component {
  
  state = {
    recipes: []
  }
  
  getRecipe = async (e) => {
    e.preventDefault()
    const recipeName = e.target.recipeName.value
    const api_call = await fetch(`http://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}`)
    const data = await api_call.json()
    this.setState({
      recipes: data.recipes
    })
  }
  
  componentDidMount = () =>  {
    const json = localStorage.getItem('recipes')
    const recipes = JSON.parse(json)
    // In ES6, if the name of the key and value pair is the same then type is as below
    this.setState({ recipes })
  }
  
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes)
    localStorage.setItem('recipes', recipes)
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
