import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import { db } from '../../firebase/config'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import './CheckoutForm.css'

const CheckoutForm = () => {
    const { cart, getTotalPrice, clearCart } = useCart()
    const [orderId, setOrderId] = useState(null)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        name: '',
        email: '',
        emailConfirm: '',
        phone: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const validate = () => {
        const newErrors = {}
        if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio'
        if (!form.email.trim()) newErrors.email = 'El email es obligatorio'
        if (form.email !== form.emailConfirm) newErrors.emailConfirm = 'Los emails no coinciden'
        if (!form.phone.trim()) newErrors.phone = 'El teléfono es obligatorio'
        return newErrors
    }

    const handleSubmit = async () => {
        const newErrors = validate()
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setLoading(true)

        const order = {
            buyer: {
                name: form.name,
                email: form.email,
                phone: form.phone
            },
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: getTotalPrice(),
            date: serverTimestamp()
        }

        try {
            const ordersCollection = collection(db, 'orders')
            const docRef = await addDoc(ordersCollection, order)
            setOrderId(docRef.id)
            clearCart()
        } catch (error) {
            console.error('Error al crear la orden:', error)
        } finally {
            setLoading(false)
        }
    }

    if (orderId) {
        return (
            <div className='checkout checkout--success'>
                <h2>¡Compra realizada con éxito! 🎉</h2>
                <p>Tu número de orden es:</p>
                <span className='checkout__order-id'>{orderId}</span>
                <p className='checkout__thanks'>Gracias por tu compra. Te contactaremos a <strong>{form.email}</strong></p>
            </div>
        )
    }

    return (
        <div className='checkout'>
            <h2 className='checkout__title'>Finalizar compra</h2>

            <div className='checkout__layout'>
                <div className='checkout__form'>
                    <h3>Tus datos</h3>

                    <div className='checkout__field'>
                        <label>Nombre completo</label>
                        <input
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder='Juan García'
                        />
                        {errors.name && <span className='checkout__error'>{errors.name}</span>}
                    </div>

                    <div className='checkout__field'>
                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder='juan@email.com'
                        />
                        {errors.email && <span className='checkout__error'>{errors.email}</span>}
                    </div>

                    <div className='checkout__field'>
                        <label>Confirmar email</label>
                        <input
                            type='email'
                            name='emailConfirm'
                            value={form.emailConfirm}
                            onChange={handleChange}
                            placeholder='juan@email.com'
                        />
                        {errors.emailConfirm && <span className='checkout__error'>{errors.emailConfirm}</span>}
                    </div>

                    <div className='checkout__field'>
                        <label>Teléfono</label>
                        <input
                            type='text'
                            name='phone'
                            value={form.phone}
                            onChange={handleChange}
                            placeholder='+54 11 1234 5678'
                        />
                        {errors.phone && <span className='checkout__error'>{errors.phone}</span>}
                    </div>

                    <button
                        onClick={handleSubmit}
                        className='checkout__submit'
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : 'Confirmar compra'}
                    </button>
                </div>

                <div className='checkout__summary'>
                    <h3>Resumen</h3>
                    {cart.map(item => (
                        <div key={item.id} className='checkout__summary-item'>
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                    <div className='checkout__summary-total'>
                        <span>Total</span>
                        <span>${getTotalPrice().toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutForm
