import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import ItemList from './ItemList'
import '../ItemDetailContainer/ItemDetailContainer'

const ItemListContainer = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoryId } = useParams()

    useEffect(() => {
        const productsCollection = collection(db, 'products')

        const fetchProducts = categoryId
            ? getDocs(query(productsCollection, where('category', '==', categoryId)))
            : getDocs(productsCollection)

        fetchProducts
            .then(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setItems(data)
            })
            .finally(() => setLoading(false))
    }, [categoryId])

    if (loading) return <p className='loading'>Cargando productos... </p>
    if (items.length === 0) return <p className='loading'>No hay productos en esta categoría.</p>

    return (
        <div className='item-list-container'>
            <ItemList products={items} />
        </div>
    )
}

export default ItemListContainer