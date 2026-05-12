import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemDetail from './ItemDetail'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const { itemId } = useParams()

    useEffect(() => {
        const docRef = doc(db, 'products', itemId)

        getDoc(docRef)
            .then(snapshot => {
                if (snapshot.exists()) {
                    setItem({ id: snapshot.id, ...snapshot.data() })
                }
            })
            .finally(() => setLoading(false))
    }, [itemId])

    if (loading) return <p className='loading'>Cargando producto... 🛋️</p>
    if (!item) return <p className='loading'>Producto no encontrado.</p>

    return (
        <div className='item-detail-container'>
            <ItemDetail item={item} />
        </div>
    )
}

export default ItemDetailContainer