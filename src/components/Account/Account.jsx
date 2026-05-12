import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Account.css'

const Account = () => {
    const { user, register, login, logout } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirm: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
        setError('')
    }

    const handleLogin = async () => {
        if (!form.email || !form.password) {
            setError('Completá todos los campos')
            return
        }
        setLoading(true)
        try {
            await login(form.email, form.password)
            setSuccess('¡Bienvenido de vuelta!')
        } catch {
            setError('Email o contraseña incorrectos')
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        if (!form.name || !form.email || !form.phone || !form.password) {
            setError('Completá todos los campos')
            return
        }
        if (form.password !== form.passwordConfirm) {
            setError('Las contraseñas no coinciden')
            return
        }
        if (form.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres')
            return
        }
        setLoading(true)
        try {
            await register(form.email, form.password, form.name, form.phone)
            setSuccess('¡Cuenta creada con éxito!')
        } catch {
            setError('Este email ya está registrado')
        } finally {
            setLoading(false)
        }
    }

    if (user) {
        return (
            <div className='account'>
                <div className='account__card'>
                    <h2 className='account__title'>Mi cuenta</h2>
                    <div className='account__info'>
                        <p><strong>Nombre:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Teléfono:</strong> {user.phone}</p>
                    </div>
                    <button onClick={logout} className='account__btn account__btn--logout'>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='account'>
            <div className='account__card'>
                <h2 className='account__title'>
                    {isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
                </h2>

                {error && <p className='account__error'>{error}</p>}
                {success && <p className='account__success'>{success}</p>}

                <div className='account__form'>
                    {!isLogin && (
                        <>
                            <div className='account__field'>
                                <label>Nombre completo</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder='Juan García'
                                />
                            </div>
                            <div className='account__field'>
                                <label>Teléfono</label>
                                <input
                                    type='text'
                                    name='phone'
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder='+54 11 1234 5678'
                                />
                            </div>
                        </>
                    )}

                    <div className='account__field'>
                        <label>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder='juan@email.com'
                        />
                    </div>

                    <div className='account__field'>
                        <label>Contraseña</label>
                        <input
                            type='password'
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            placeholder='Mínimo 6 caracteres'
                        />
                    </div>

                    {!isLogin && (
                        <div className='account__field'>
                            <label>Confirmar contraseña</label>
                            <input
                                type='password'
                                name='passwordConfirm'
                                value={form.passwordConfirm}
                                onChange={handleChange}
                                placeholder='Repetí tu contraseña'
                            />
                        </div>
                    )}

                    <button
                        onClick={isLogin ? handleLogin : handleRegister}
                        className='account__btn'
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Registrarme'}
                    </button>
                </div>

                <p className='account__switch'>
                    {isLogin ? '¿No tenés cuenta?' : '¿Ya tenés cuenta?'}
                    <span onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess('') }}>
                        {isLogin ? ' Registrate' : ' Iniciá sesión'}
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Account