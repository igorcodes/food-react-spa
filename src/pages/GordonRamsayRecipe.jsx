import {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {getMealById} from '../api'; // функция из api.jsx кот достает данные по id getMealById(id)
import {Preloader} from '../components/Preloader';

function GordonRamsayRecipe() {
    const [recipe, setRecipe] = useState({});
    const {id} = useParams();
    const {goBack} = useHistory();

    useEffect(() => {

//достаем данные (массив meals) по id при помощи функ getMealById, после этого вызовем setRecipe и отправить эти данные в стейт
        getMealById(id).then((data) => setRecipe(data.meals[0]));
    }, [id]); //useEffect должен срабатывать каждый раз когда id поменялся - новый параметр пришол и мы новый рецепт запросили

    return (
    <>
    
{/* // у recipe есть id, и мы проверяем что если этого id пока нету в recipe тогда возвращать прелоадер */}
    {!recipe.idMeal ? ( <Preloader /> ) : (
        <div className="recipe"> {/* если idMeal есть то тут будет весь рецепт */}
        <img src={recipe.strMealThumb} alt={recipe.strMeal} /> {/* с постмана беру ключи обьекта кот вернулся по запросу с api */}
        <h1>{recipe.strMeal}</h1>
        <h6>Category: {recipe.strCategory}</h6>
        { recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null } {/* //strArea есть не всегда, поэтому проверяем - если есть то выдаем, если нету то null  */}
        <p>{recipe.strInstructions}</p>

        <table className='centered'>
            <thead>
                <tr>
                    <th>Ingredient</th>
                    <th>Measure</th>
                </tr>
            </thead>
            <tbody>
                {
                  //object.keys(recipe) получает массив со всеми ключами обьекта с ингредиентами
                    Object.keys(recipe).map(key => {
//проверяем что наш ключ включает в свое название слово ингредиент и что он не пустой
                        if(key.includes('Ingredient') && recipe[key]) {
                            return (
                                <tr key={key}>
                                    <td>{recipe[key]}</td> {/* название нашего ингредиента */}
                                    <td>{
            //нам приходит массив ингредиентов с номерами, выглядит так strIngredient9, 
            //номер будет тринадцатым символом елемента, нам нужно получить только этот номер, поэтому указываем позицию этой цифры 
                                    recipe[`strMeasure${key.slice(13)}`]
                                    }</td>
                                </tr>
                            )
                        }

                        return null; //ничего не ресуй если не нашел ключ с надписью ингредиент
                    })
                }
            </tbody>
        </table>
        
        {recipe.strYoutube ? (

            <div className='row'>
                <h5 style={{margin: '2rem 0 1.5rem'}}>Video Recipe</h5>
                <iframe 
                    title={id} 
                    src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}`} 
                    allowfullscreen 
                />
            </div>
        
        ) : null}
        </div>
    )}
    <button className='btn' onClick={goBack}> Go Back </button>

    </>
    );
    
}

export {GordonRamsayRecipe};

