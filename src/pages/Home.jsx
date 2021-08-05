import {useState, useEffect} from 'react' // импортируем из реакта состояния
import {useLocation, useHistory} from 'react-router-dom'
import {getAllCategories} from '../api' // импортируем метод всех категорий
import {Preloader} from '../components/Preloader'
import {CategoryList} from '../components/CategoryList'
import {Search} from '../components/Search'

function Home() {  
    //каталог со всеми категориями и функция
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);

    const {pathname, search} = useLocation();
    const {push} = useHistory();
    // console.log(push);
    // console.log(pathname, search)

//фильтруем текущий каталог, берем каждый элемент каталога, обходим его 
//strCategory это строка с именем категории, смотрим включает ли она строку кот ввел пользователь
    const handleSearch = (str) => {
        setFilteredCatalog(
            catalog.filter(item => item.strCategory.toLowerCase().includes(str.toLowerCase()))
        );
        push({ //для отображения переметров поиска в адресной строке браузера у нас будет склеиваться pathname и search
            pathname, 
            search: `?search=${str}`, //должен добавиться гет параметр с ключом search к тому параметру который мы получим извне str
        })
    }

//getAllCategories возвращает промис со всеми данными, и будем их сдесь обрабатывать
    useEffect(() => {
        getAllCategories().then(data => {
            setCatalog(data.categories); // по ссылке api возвращает обьект categories - смортим в постман
            setFilteredCatalog(search ? 
                data.categories.filter(item => 
                    item.strCategory
                    .toLowerCase()
                    .includes(search.split('=')[1].toLowerCase())
                ) : data.categories
            );
        });
        }, [search]);

    // если каталог путой (!catalog.length) то прелоадер
    // если не пустой то будет выдавать отдельный компонент <CategoryList/> и буду туда спускать весь каталог catalog={ catalog }
    return (
            <> 
            <Search cb={handleSearch} />
            {!catalog.length ? <Preloader /> : (
                <CategoryList catalog={ filteredCatalog }/> //в компонент CategoryList передаю весь каталог
            )}
            </>
            );
}

export {Home}