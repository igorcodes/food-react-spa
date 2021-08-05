import {Link} from 'react-router-dom'
//import {GordonRamsayRecipe} from '../pages/GordonRamsayRecipe'

function Meal(props) { //в обьекте meals ключи strMeal, idMeal, strMealThumb
    const {strMeal, idMeal, strMealThumb } = props;

    // возвращает обьект отсортированные блюда
    return <div className="card"> 
    <div className="card-image">
      <img src={strMealThumb} alt={strMeal} />
    </div>
    <div className="card-content">
      <span className="card-title">{strMeal}</span>
    </div>
    <div className='card-action'>
        <Link to={`/meal/${idMeal}`} className='btn'>Watch recipe</Link>
    </div>
  </div>

}

export {Meal};