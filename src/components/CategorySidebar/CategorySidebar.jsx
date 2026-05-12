import { NavLink } from 'react-router-dom'
import './CategorySidebar.css'

const categories = [
    { id: 'sillones', label: 'Sillones' },
    { id: 'sillas', label: 'Sillas' },
    { id: 'mesas', label: 'Mesas' },
    { id: 'percheros', label: 'Percheros' },
    { id: 'camas', label: 'Camas' },
]

const CategorySidebar = () => {
    return (
        <aside className='category-sidebar'>
            <h6 className='category-sidebar__title'>Categorías</h6>
            <ul className='category-sidebar__list'>
                <li>
                    <NavLink
                        to='/'
                        end
                        className={({ isActive }) =>
                            isActive ? 'category-sidebar__link active' : 'category-sidebar__link'
                        }
                    >
                        Todos
                    </NavLink>
                </li>
                {categories.map(cat => (
                    <li key={cat.id}>
                        <NavLink
                            to={`/category/${cat.id}`}
                            className={({ isActive }) =>
                                isActive ? 'category-sidebar__link active' : 'category-sidebar__link'
                            }
                        >
                            {cat.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default CategorySidebar