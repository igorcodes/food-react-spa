import {Meal} from './Meal'

function MealList({meals}) { //принимает список блюд

    return <div className='list'> {/* // обходит цикло через мап этот список */}
        {meals.map((meal) => (
            <Meal key={meal.idMeal} {...meal} />  //постман показывает ключ обьекта meal это idMeal
        ))}
    </div>
}

export {MealList};