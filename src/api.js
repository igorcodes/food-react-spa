import {API_URL} from './config'

// поиск по id, в запрос фетч вбиваем www.themealdb.com/api/json/v1/1/lookup.php?i= плюс mealId
// функция асинхронная и не будет блокировать работу приложения
const getMealById = async (mealId) => {
    const response = await fetch(API_URL + 'lookup.php?i=' + mealId);
    return await response.json();
}


/* const getMealById = (mealId) => {
    fetch(API_URL + 'lookup.php?i=' + mealId);
} */

const getAllCategories = async () => {
    const response = await fetch(API_URL + 'categories.php');
    return await response.json();
}

const getFilteredCategory  = async (catName) => {
    const response = await fetch(API_URL + 'filter.php?c=' + catName);
    return await response.json();
}

export { getMealById, getAllCategories, getFilteredCategory }
