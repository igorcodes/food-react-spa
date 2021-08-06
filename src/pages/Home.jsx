import {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {getAllCategories} from '../api'
import {Preloader} from '../components/Preloader'
import {CategoryList} from '../components/CategoryList'
import {Search} from '../components/Search'

function Home() {  
    const [catalog, setCatalog] = useState([]);
    const [filteredCatalog, setFilteredCatalog] = useState([]);

    const {pathname, search} = useLocation();
    const {push} = useHistory();
    // console.log(push);
    // console.log(pathname, search)

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
    // если не пустой то будет выдавать отдельный компонент <CategoryList/> и туда спускать весь каталог catalog={ catalog }
    return (
            <> 
            <Search cb={handleSearch} />
            {!catalog.length ? <Preloader /> : (
                <CategoryList catalog={ filteredCatalog }/>
            )}
            </>
            );
}

export {Home}
