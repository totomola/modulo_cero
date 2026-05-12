import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Layout from './components/Layout/Layout'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import Cart from './components/Cart/Cart'
import CheckoutForm from './components/CheckoutForm/CheckoutForm'
import Account from './components/Account/Account'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<ItemListContainer />} />
              <Route path='category/:categoryId' element={<ItemListContainer />} />
            </Route>
            <Route path='/item/:itemId' element={<ItemDetailContainer />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<CheckoutForm />} />
            <Route path='/account' element={<Account />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App