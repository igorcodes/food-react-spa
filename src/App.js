import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//компонент наз BrowserRouter, но есть практика его называть как Router и мы его переименовуем и будем использовать как Router
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import {Home} from './pages/Home';
import {About} from './pages/About';
import {Contact} from './pages/Contact';
import {Category} from './pages/Category';
import {NotFound} from './pages/NotFound';
import {GordonRamsayRecipe} from './pages/GordonRamsayRecipe'; // загружаем страницу

function App() {
  return (
    <>
      <Router basename='/food-react-spa'>
      <Header />
      <main className='container content'>
{/* // слассы container и content тут будут разные странички */}
{/* та часть которую мы хотим обернуть в многостраничность она должна быть обернута в роутер */}
        <Switch> {/* Switch позволяет остановиться на одной странице которой подходит наш запрос и дальше просто не проверять */}
        {/* Switch должен только роуты содержать внутри себя */}

{/* path='/' - это путь по которому пользователи будут искать страницу и мы говорим что компонент который принадлежит этому пути называется component={} */} 
{/* вот мой отдельный компонент который отвечает за дом страницу */}
        <Route exact path='/' > {/* exact - точный путь */}
            <Home />
        </Route>
        <Route path='/about' component={About} />
        <Route path='/contacts' component={Contact} />
        <Route path='/category/:name' component={Category} />
        <Route path='/meal/:id' component={GordonRamsayRecipe} /> {/* //создаем ей ссылку */}

        {/* мы просто попадем в самый последний вариант и отрисуем нот фаунд  */}
        <Route component={NotFound} /> {/* он отработает в том случае если ни один из верхних роутов не сработает */}

        </Switch>
      </main>
      <Footer />
      </Router>
    </>
  );
}

export default App;
