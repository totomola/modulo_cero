import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addItem = (item, quantity) => {
        const exists = cart.find(p => p.id === item.id)
        if (exists) {
            setCart(cart.map(p =>
                p.id === item.id
                    ? { ...p, quantity: p.quantity + quantity }
                    : p
            ))
        } else {
            setCart([...cart, { ...item, quantity }])
        }
    }

    const removeItem = (id) => {
        setCart(cart.filter(p => p.id !== id))
    }

    const clearCart = () => {
        setCart([])
    }

    const getTotalItems = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0)
    }

    const getTotalPrice = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, getTotalItems, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)