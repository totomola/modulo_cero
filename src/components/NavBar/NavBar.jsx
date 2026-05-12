import { Link, NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
            <Link to='/' className='navbar-brand fw-bold fs-4'>
                Módulo Cero
            </Link>

            {/* Boton para mobile */}
            <button
                className='navbar-toggler'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target='#navbarNav'
            >
                <span className='navbar-toggler-icon'></span>
            </button>

            {/* Links para navegación */}

            <div className='collapse navbar-collapse' id='navbarNav'>
                <ul className='navbar-nav ms-auto align-items-center gap-2'>
                    <li className='nav-item'>
                        <NavLink
                            to='/'
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Productos
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink
                            to='/account'
                            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                        >
                            Mi cuenta
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <CartWidget />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar