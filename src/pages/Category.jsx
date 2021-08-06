import {useState, useEffect} from 'react' 
import {useParams, useHistory} from 'react-router-dom'
import {getFilteredCategory} from '../api' // отвечает за получение конкретной одной категории (фильтрует категории)
import {Preloader} from '../components/Preloader'
import {MealList} from '../components/MealList' // компонент список блюд

function Category() {
    const {name} = useParams(); //вынимаем имя из useParams

//загружаем список всех категорий устанавливаем их в стейт и спускаем их вниз
    const [meals, setMeals] = useState([]);
    
    const {goBack} = useHistory();

    useEffect(() => { 
        getFilteredCategory(name).then((data) => setMeals(data.meals)); // единоразово при переходе на страницу будем фильтровать категорию передавая туда name
    }, [name]);

    return <>
    <button className='btn' onClick={goBack}>Go Back</button>
    
    // пока стейт пустой грузится прелоадер, когда он уже не пустой - загружаем туда список еды, в MealList он обходит его циклом через мап и выдает нам еду с картинокй и названием и кнопкой для перехода
    {!meals.length ? <Preloader /> : <MealList meals={meals} />} 
    </>
    
}

export {Category}
