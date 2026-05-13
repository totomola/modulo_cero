# Módulo Cero

E-commerce SPA de muebles variados de diseño desarrollado con React y Firebase.

---

##

---

##

- **React 18** — biblioteca de UI
- **Vite** — bundler y entorno de desarrollo
- **React Router DOM** — navegación SPA
- **Firebase Firestore** — base de datos en la nube
- **Firebase Authentication** — registro e inicio de sesión
- **Bootstrap 5** — estilos y responsive
- **CSS Modules** — estilos por componente

---

## Funcionalidades

- Diseño responsive para mobile, tablet y desktop
- Listado de productos traídos desde Firestore
- Filtrado por categoría (Sillones, Sillas, Mesas, Percheros, Camas)
- Carrito de compras con estado global (Context API)
- Detalle de producto con selector de cantidad
- Checkout con validación de formulario
- Generación de orden en Firestore al confirmar compra
- Registro e inicio de sesión con Firebase Auth

## Firebase

El proyecto utiliza dos servicios de Firebase:

- **Firestore** — colecciones `products` con array de productos, `orders`para registrar todas las compras y `users` para guardas los usuarios que se crean una cuenta.
- **Authentication** — proveedor de correo electrónico y contraseña

## 👨‍💻 Autor

**Tomas Mola**

- GitHub: [@totomola](https://github.com/totomola)
- Linkedin: 
