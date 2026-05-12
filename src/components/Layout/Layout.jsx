import { Outlet } from 'react-router-dom'
import CategorySidebar from '../CategorySidebar/CategorySidebar'
import './Layout.css'

const Layout = () => {
    return (
        <div className='layout'>
            <div className='layout__sidebar'>
                <CategorySidebar />
            </div>
            <div className='layout__content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout