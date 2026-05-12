import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({ stock, onAdd }) => {
    const [count, setCount] = useState(1)

    const handleDecrease = () => {
        if (count > 1) setCount(count - 1)
    }

    const handleIncrease = () => {
        if (count < stock) setCount(count + 1)
    }

    return (
        <div className='item-count'>
            <div className='item-count__controls'>
                <button onClick={handleDecrease} className='item-count__btn'>-</button>
                <span className='item-count__number'>{count}</span>
                <button onClick={handleIncrease} className='item-count__btn'>+</button>
            </div>
            <button
                onClick={() => onAdd(count)}
                className='item-count__add'
            >
                Agregar al carrito
            </button>
        </div>
    )
}

export default ItemCount