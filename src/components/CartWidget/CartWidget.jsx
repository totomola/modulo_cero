
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './CartWidget.css'

const CartWidget = () => {
    const { getTotalItems } = useCart()
    const total = getTotalItems()

    if (total === 0) return null

    return (
        <Link to='/cart' className='cartwidget'>
            🛒 <span>{total}</span>
        </Link>
    )
}

export default CartWidget