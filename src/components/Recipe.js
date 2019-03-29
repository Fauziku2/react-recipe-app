import React from 'react'
import { Link } from 'react-router-dom'

const API_KEY = 'fa58b435cf95279d48fade806d1006db'

class Recipe extends React.Component {
  
  state = {
    activeRecipe: null
  }
  
  componentDidMount = async () => {
    const recipeId = this.props.location.state.recipeId
    const req = await fetch(`http://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/get?key=${API_KEY}&rId=${recipeId}`)
    
    const res = await req.json()
    this.setState({
      activeRecipe: res.recipe
    })
  }
  
  render() {
    const recipe = this.state.activeRecipe
    return (
      <div className="container">
        {
          this.state.activeRecipe &&
          <div className="active-recipe">
            <img className="active-recipe__img" src={recipe.image_url} alt={recipe.title}/>
            <h3 className="active-recipe__title">{recipe.title}</h3>
            <h4 className="active-recipe__publisher">
              Publisher: <span>{recipe.publisher}</span>
            </h4>
            <p className="active-recipe__website">
              Website: <span><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span>
            </p>
            <button className="active-recipe__button">
              <Link to="/">Go Home</Link>
            </button>
          </div>
        }
      </div>
    )
  }
}

export default Recipe