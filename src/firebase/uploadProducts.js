import { db } from './config'
import { collection, addDoc } from 'firebase/firestore'

const products = [
  {
    name: 'Sillón Chester Clásico',
    category: 'sillones',
    price: 1200000,
    stock: 5,
    description: 'Sillón capitoné en cuero genuino color coñac. Estructura de madera maciza y patas torneadas. Ideal para estudios y salas de estar clásicas.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop'
  },
  {
    name: 'Sillón Escandinavo Gris',
    category: 'sillones',
    price: 850000,
    stock: 8,
    description: 'Sillón de líneas limpias en tela gris perla. Patas de madera de roble natural. Perfecto para ambientes modernos y minimalistas.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop'
  },
  {
    name: 'Sillón Reclinable Premium',
    category: 'sillones',
    price: 1500000,
    stock: 3,
    description: 'Sillón reclinable en cuero sintético negro con reposapiés integrado. Mecanismo de reclinación suave y silencioso.',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop'
  },
  {
    name: 'Silla Thonet Bentwood',
    category: 'sillas',
    price: 200000,
    stock: 20,
    description: 'Réplica de la icónica silla Thonet en madera de haya curvada. Liviana, resistente y atemporal. Apta para uso interior y exterior.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop'
  },
  {
    name: 'Silla de Escritorio Ergonómica',
    category: 'sillas',
    price: 250000,
    stock: 12,
    description: 'Silla de oficina con soporte lumbar ajustable, reposabrazos 3D y asiento de malla transpirable. Ideal para largas jornadas de trabajo.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop'
  },
  {
    name: 'Silla de Comedor Industrial',
    category: 'sillas',
    price: 150000,
    stock: 15,
    description: 'Silla de comedor con estructura de hierro negro y asiento de madera de pino. Estilo industrial que combina con mesas de madera y metal.',
    image: 'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&h=800&fit=crop'
  },
  {
    name: 'Mesa de Comedor Roble Macizo',
    category: 'mesas',
    price: 1800000,
    stock: 4,
    description: 'Mesa de comedor en roble macizo natural. 180cm de largo, capacidad para 8 personas. Acabado al aceite que resalta las vetas de la madera.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop'
  },
  {
    name: 'Mesa Ratona de Centro',
    category: 'mesas',
    price: 400000,
    stock: 9,
    description: 'Mesa ratona con tapa de vidrio templado y estructura de metal dorado. Elegante y funcional, ideal para salas modernas.',
    image: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800&h=800&fit=crop'
  },
  {
    name: 'Mesa de Escritorio Flotante',
    category: 'mesas',
    price: 450000,
    stock: 7,
    description: 'Escritorio de pared en MDF blanco. Se fija directamente a la pared ahorrando espacio. Incluye estante superior integrado.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=800&fit=crop'
  },
  {
    name: 'Perchero de Pie Nórdico',
    category: 'percheros',
    price: 90000,
    stock: 18,
    description: 'Perchero de pie en madera de fresno natural. 8 ganchos distribuidos en distintas alturas. Diseño escandinavo minimalista.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop'
  },
  {
    name: 'Perchero de Pared Industrial',
    category: 'percheros',
    price: 140000,
    stock: 25,
    description: 'Perchero de pared con estructura de hierro negro y ganchos de madera. Fácil instalación y gran capacidad de carga.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=800&fit=crop'
  },
  {
    name: 'Perchero Multiuso con Zapatero',
    category: 'percheros',
    price: 190000,
    stock: 6,
    description: 'Perchero de entrada con zapatero inferior, ganchos superiores y espejo lateral. Solución completa para el ingreso del hogar.',
    image: 'https://images.unsplash.com/photo-1604709177225-055f82ff4e4e?w=800&h=800&fit=crop'
  },
  {
    name: 'Cama King Tapizada en Lino',
    category: 'camas',
    price: 1200000,
    stock: 3,
    description: 'Cama king size con respaldo tapizado en lino beige. Base box incluida. Estructura robusta con listones de madera de alta resistencia.',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=800&fit=crop'
  },
  {
    name: 'Cama Marinera Juvenil',
    category: 'camas',
    price: 900000,
    stock: 7,
    description: 'Cama marinera en MDF blanco con cajones inferiores y escalera lateral. Ideal para habitaciones juveniles o espacios reducidos.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=800&fit=crop'
  },
  {
    name: 'Cama de Diseño con Respaldo Alto',
    category: 'camas',
    price: 1900000,
    stock: 4,
    description: 'Cama matrimonial con respaldo alto acolchado en terciopelo azul petróleo. Patas de madera de roble. Diseño contemporáneo y sofisticado.',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=800&fit=crop'
  }
]

export const uploadProducts = async () => {
  const productsCollection = collection(db, 'products')
  for (const product of products) {
    await addDoc(productsCollection, product)
    console.log(`✅ Subido: ${product.name}`)
  }
  console.log('🎉 Todos los productos subidos')
}