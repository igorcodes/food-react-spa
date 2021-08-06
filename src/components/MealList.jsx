import {Meal} from './Meal'

function MealList({meals}) { //принимает список блюд

    return <div className='list'>  {/* // обходит циклом через мап этот список */}
        {meals.map((meal) => (
            <Meal key={meal.idMeal} {...meal} /> 
        ))}
    </div>
}

export {MealList};
