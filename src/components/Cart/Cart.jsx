import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import './Cart.css'

const Cart = () => {
    const { cart, clearCart, getTotalPrice } = useCart()

    if (cart.length === 0) {
        return (
            <div className='cart cart--empty'>
                <h2>Tu carrito está vacío 🛒</h2>
                <Link to='/' className='cart__back'>Ver productos</Link>
            </div>
        )
    }

    return (
        <div className='cart'>
            <h2 className='cart__title'>Tu carrito</h2>

            <div className='cart__items'>
                {cart.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
            </div>

            <div className='cart__footer'>
                <p className='cart__total'>
                    Total: <span>${getTotalPrice().toLocaleString()}</span>
                </p>
                <div className='cart__actions'>
                    <button onClick={clearCart} className='cart__clear'>
                        Vaciar carrito
                    </button>
                    <Link to='/checkout' className='cart__checkout'>
                        Finalizar compra
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart