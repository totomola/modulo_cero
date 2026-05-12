import { useCart } from '../../context/CartContext'
import './CartItem.css'

const CartItem = ({ id, name, price, quantity, image }) => {
    const { removeItem } = useCart()

    return (
        <div className='cart-item'>
            <img src={image} alt={name} className='cart-item__image' />
            <div className='cart-item__info'>
                <h3 className='cart-item__name'>{name}</h3>
                <p className='cart-item__quantity'>Cantidad: {quantity}</p>
                <p className='cart-item__price'>${(price * quantity).toLocaleString()}</p>
            </div>
            <button
                className='cart-item__remove'
                onClick={() => removeItem(id)}
            >
                ✕
            </button>
        </div>
    )
}

export default CartItem