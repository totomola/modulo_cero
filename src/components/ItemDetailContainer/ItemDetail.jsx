import { useState } from 'react'
import ItemCount from './ItemCount'
import { useCart } from '../../context/CartContext'
import './ItemDetail.css'

const ItemDetail = ({ item }) => {
    const [added, setAdded] = useState(false)
    const { addItem } = useCart()

    const handleAdd = (quantity) => {
        addItem(item, quantity)
        setAdded(true)
    }

    return (
        <div className='item-detail'>
            <img src={item.image} alt={item.name} className='item-detail__image' />
            <div className='item-detail__info'>
                <span className='item-detail__category'>{item.category}</span>
                <h2 className='item-detail__name'>{item.name}</h2>
                <p className='item-detail__description'>{item.description}</p>
                <p className='item-detail__price'>${item.price.toLocaleString()}</p>
                <p className='item-detail__stock'>Stock disponible: {item.stock} unidades</p>

                {added
                    ? <p className='item-detail__added'>✅ Producto agregado al carrito</p>
                    : <ItemCount stock={item.stock} onAdd={handleAdd} />
                }
            </div>
        </div>
    )
}

export default ItemDetail