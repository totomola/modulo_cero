import { Link } from 'react-router-dom'
import './Item.css'

const Item = ({ id, name, price, image, category }) => {
    return (
        <div className='item-card'>
            <img src={image} alt={name} className='item-card__image' />
            <div className='item-card__info'>
                <span className='item-card__category'>{category}</span>
                <h3 className='item-card__name'>{name}</h3>
                <p className='item-card__price'>${price.toLocaleString()}</p>
                <Link to={`/item/${id}`} className='item-card__btn'>
                    Ver detalle
                </Link>
            </div>
        </div>
    )
}

export default Item