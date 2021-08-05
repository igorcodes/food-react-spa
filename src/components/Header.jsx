import {Link} from 'react-router-dom'
//Link компонент который позволяет обновлять без перезагрузки

function Header() {
    // https://materializecss.com/navbar.html
    return <nav className='green'>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">React SPA  "World food recipes"</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        
        <li>
            <Link to="/about">
            About
            </Link>
        </li>

        <li>
            <Link to="/contacts">
            Contacts
            </Link>
        </li>

      </ul>
    </div>
  </nav>
}

export {Header}