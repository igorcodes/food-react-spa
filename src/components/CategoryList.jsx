import { CategoryItem } from './CategoryItem'

function CategoryList({catalog = []}) { // принимает пропс каталог со значением по умолчанию пустой массив
    

// возвращаем див, внутри которого проходим каталог мапом
    return (
        <div className='list'> 
        {catalog.map((el) => (
            <CategoryItem key={el.idCategory} {...el} />
        ))}
    </div>
    );
}


export {CategoryList}