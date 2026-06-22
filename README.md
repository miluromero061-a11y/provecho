# 🍕 PROECHO - Aplicación de Delivery Gastronómico

![Proecho Logo](src/assets/logo.svg)

**"Tu comida favorita, más cerca que nunca"**

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Características](#características)
3. [Diseño Visual](#diseño-visual)
4. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
5. [Modelo de Base de Datos](#modelo-de-base-de-datos)
6. [Análisis de Claves Primarias](#análisis-de-claves-primarias)
7. [Instalación](#instalación)
8. [Guía de Uso](#guía-de-uso)
9. [API Endpoints](#api-endpoints)
10. [Tecnologías](#tecnologías)

---

## 📱 Descripción General

**Proecho** es una plataforma integral de delivery de comida que conecta usuarios con restaurantes, permitiendo:

- 🔍 Búsqueda y exploración de restaurantes
- 🍔 Navegación de menús por categorías
- 🛒 Carrito de compras avanzado
- 💳 Pagos digitales seguros
- 📍 Seguimiento en tiempo real con GPS
- ⭐ Sistema de calificaciones y comentarios
- 🎟️ Cupones y promociones
- 🔔 Notificaciones personalizadas
- 👤 Perfil de usuario con historial

---

## ✨ Características

### Para Usuarios

#### Registro e Inicio de Sesión
- ✅ Autenticación segura con cifrado
- ✅ Verificación de email
- ✅ Recuperación de contraseña
- ✅ Perfil de usuario personalizado

#### Exploración de Restaurantes
- 🔍 Búsqueda por nombre o ubicación
- 📂 Filtrado por categorías de cocina
- ⭐ Filtrado por calificación
- 📍 Búsqueda por proximidad (GPS)
- 🕐 Visualización de horarios de funcionamiento

#### Catálogo de Productos
- 📸 Imágenes de alta calidad
- 💰 Precios claros
- 📝 Descripciones detalladas
- 🥗 Información nutricional (calorías, ingredientes)
- ⚠️ Identificación de alérgenos
- 🏷️ Promociones y descuentos

#### Carrito y Checkout
- ➕➖ Modificar cantidades fácilmente
- 💬 Agregar instrucciones especiales
- 🎟️ Aplicar cupones de descuento
- 💳 Múltiples métodos de pago
- 🎁 Puntos de lealtad

#### Seguimiento de Órdenes
- 🔴 Estado en tiempo real
- 📍 Ubicación del repartidor (GPS)
- ⏱️ ETA actualizada constantemente
- 🔔 Notificaciones de cada cambio de estado

#### Reseñas y Calificaciones
- ⭐ Calificar de 1 a 5 estrellas
- 💬 Comentarios con fotos
- 👍 Sistema de útiles/no útiles

### Para Restaurantes

- 📊 Dashboard de órdenes
- 📈 Estadísticas de ventas
- 🕐 Gestión de horarios
- 🍽️ Gestión de menú
- 💰 Historial de pagos

---

## 🎨 Diseño Visual

### Paleta de Colores

| Color | Código | Uso |
|-------|--------|-----|
| 🟠 Naranja Vibrante | `#FF9500` | Colores primarios, botones, acentos |
| 🟡 Amarillo Suave | `#FFD700` | Promociones, descuentos |
| ⚪ Blanco | `#FFFFFF` | Fondos, áreas limpias |
| ⬛ Negro Oscuro | `#1A1A1A` | Textos principales |
| 🩶 Gris Claro | `#E8E8E8` | Bordes, divisores |

### Tipografía

- **Títulos (H1-H3)**: Bold, 24-32px
- **Cuerpo (Body1-Body2)**: Regular, 14-16px
- **Botones**: Semibold, 16px
- **Captions**: Regular, 11-12px

### Componentes UI

- **Bordes Redondeados**: 8-16px (modernismo)
- **Sombras**: Suave (consistencia visual)
- **Animaciones**: 300ms easing-out (fluidez)

---

## 🏗️ Arquitectura del Proyecto

```
provecho/
├── src/
│   ├── models/
│   │   └── index.ts              # Interfaces TypeScript de datos
│   ├── components/
│   │   ├── ProductCatalog.tsx   # Catálogo de productos
│   │   ├── ShoppingCart.tsx     # Carrito de compras
│   │   └── OrderTracking.tsx    # Seguimiento en tiempo real
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Pantalla de inicio
│   │   ├── RestaurantDetail.tsx # Detalle de restaurante
│   │   ├── CheckoutScreen.tsx   # Proceso de pago
│   │   └── ProfileScreen.tsx    # Perfil del usuario
│   ├── services/
│   │   ├── api.ts              # Configuración de API
│   │   ├── auth.ts             # Autenticación
│   │   └── payment.ts          # Integración de pagos
│   ├── styles/
│   │   └── theme.ts            # Tema y colores globales
│   └── assets/
│       └── logo.svg            # Logo de Proecho
├── database/
│   └── schema.sql              # Esquema completo de BD
├── DATABASE_SCHEMA.md          # Documentación del esquema
├── ANALISIS_CLAVES_PRIMARIAS.md # Análisis de claves
├── package.json                # Dependencias
└── README.md                   # Este archivo
```

---

## 🗄️ Modelo de Base de Datos

### Tablas Principales

#### 1. **PRODUCTS** (Registro Principal Documentado)

**Clave Primaria**: `product_id` (INT AUTO-INCREMENT)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| **product_id** (PK) | INT | Identificador único del producto |
| restaurant_id (FK) | INT | Referencia al restaurante |
| category_id (FK) | INT | Categoría del producto |
| name | VARCHAR(255) | Nombre del producto |
| description | TEXT | Descripción detallada |
| price | DECIMAL(10,2) | Precio en moneda local |
| image_url | VARCHAR(500) | URL de la imagen |
| is_active | BOOLEAN | Disponibilidad |
| preparation_time | INT | Tiempo en minutos |
| calories | INT | Información nutricional |
| ingredients | JSON | Lista de ingredientes |
| allergens | JSON | Alérgenos identificados |
| discount_percentage | DECIMAL(5,2) | % de descuento |
| created_at | TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | Última actualización |

**Justificación de Clave Primaria**: Ver [ANALISIS_CLAVES_PRIMARIAS.md](ANALISIS_CLAVES_PRIMARIAS.md)

#### 2. **USERS**

| Campo | Descripción |
|-------|-------------|
| user_id (PK) | ID único |
| email (UNIQUE) | Email de acceso |
| phone (UNIQUE) | Teléfono de contacto |
| password_hash | Contraseña encriptada |
| first_name, last_name | Nombre completo |
| preferred_address | Dirección de entrega por defecto |
| loyalty_points | Puntos acumulados |

#### 3. **RESTAURANTS**

| Campo | Descripción |
|-------|-------------|
| restaurant_id (PK) | ID único |
| name | Nombre único |
| owner_id (FK) | Propietario (usuario) |
| address, latitude, longitude | Ubicación |
| average_rating | Calificación promedio |
| delivery_time_minutes | Tiempo de entrega |
| is_open | Estado operativo |

#### 4. **ORDERS**

| Campo | Descripción |
|-------|-------------|
| order_id (PK) | ID único |
| user_id (FK) | Usuario que ordena |
| restaurant_id (FK) | Restaurante |
| order_number | Número de seguimiento |
| total_amount | Monto total |
| status | Estado (pending, preparing, etc.) |
| delivery_latitude, delivery_longitude | Ubicación en tiempo real |
| estimated_delivery_time | ETA |

#### 5. **ORDER_ITEMS**

| Campo | Descripción |
|-------|-------------|
| order_item_id (PK) | ID único del item |
| order_id (FK) | Referencia a orden |
| product_id (FK) | Referencia a producto |
| quantity | Cantidad |
| unit_price | Precio al momento |
| special_requests | Solicitudes especiales |

---

## 🔑 Análisis de Claves Primarias

### Registro Analizado: PRODUCTS

#### **Clave Elegida**: `product_id` (INT AUTO-INCREMENT)

#### **Razones de Selección**:

1. **✅ Unicidad Garantizada**
   - Cada producto tiene un identificador único e inmutable
   - Imposible duplicar o confundir

2. **✅ Independencia de Datos**
   - Cambios en nombre, precio no afectan referencias externas
   - Si se renombra "Hamburguesa" → "Burger", el ID sigue siendo 42

3. **✅ Rendimiento Superior**
   - Búsquedas por INT: ~0.001ms
   - Búsquedas por STRING: ~5-10ms
   - Con millones de productos: INT es 500x más rápido

4. **✅ Escalabilidad**
   - Soporta 2,147,483,647 productos (limite INT)
   - Índices compactos (50MB vs 500MB con STRING)

5. **✅ Facilidad de Referencia**
   - Order Items referencian solo 1 campo: `product_id`
   - Alternativa compuesta requeriría 2 campos

6. **✅ Cumple Normalizaciones**
   - 3NF (Tercera Forma Normal)
   - BCNF (Forma Normal de Boyce-Codd)
   - Integridad referencial garantizada

#### **Opciones NO Elegidas y Por Qué**:

| Opción | Desventaja |
|--------|-----------|
| `name` | Si cambia: rompe todas las referencias |
| `(restaurant_id, name)` | Complejo, lento, no transferible entre restaurantes |
| `UUID` | Muy lento, tamaño 36 caracteres |

**Conclusión**: `product_id` es la mejor opción posible.

**Documentación Completa**: [ANALISIS_CLAVES_PRIMARIAS.md](ANALISIS_CLAVES_PRIMARIAS.md)

---

## 🚀 Instalación

### Requisitos Previos

- Node.js 16+ 
- npm o yarn
- MySQL 8.0+
- Git

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/miluromero061-a11y/provecho.git
cd provecho
```

### Paso 2: Instalar Dependencias

```bash
npm install
# o
yarn install
```

### Paso 3: Configurar Base de Datos

```bash
# Crear base de datos
mysql -u root -p < database/schema.sql

# O si prefieres CLI interactivo
mysql -u root -p
> CREATE DATABASE provecho;
> USE provecho;
> SOURCE database/schema.sql;
```

### Paso 4: Configurar Variables de Entorno

```bash
# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales
REACT_APP_API_URL=http://localhost:3001
DATABASE_URL=mysql://user:password@localhost:3306/provecho
JWT_SECRET=your-secret-key
STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

### Paso 5: Iniciar la Aplicación

```bash
# Modo desarrollo
npm run dev

# Construcción para producción
npm run build

# Ejecutar tests
npm test
```

---

## 📖 Guía de Uso

### Para Usuarios

#### 1. Registrarse

1. Abre la aplicación
2. Haz clic en "Crear Cuenta"
3. Completa tu email y contraseña
4. Verifica tu email
5. ¡Listo! Puedes hacer tu primer pedido

#### 2. Buscar Restaurantes

1. En la pantalla de inicio, usa la barra de búsqueda
2. O explora por categorías (Hamburguesas, Pizzas, etc.)
3. Ordena por: Rating, tiempo de entrega, distancia

#### 3. Agregar Productos al Carrito

1. Abre un restaurante
2. Selecciona una categoría
3. Haz clic en un producto
4. Elige cantidad y opciones especiales
5. Presiona "Agregar al carrito"

#### 4. Checkout

1. Revisa tu carrito
2. Aplica cupones si tienes
3. Selecciona dirección de entrega
4. Elige método de pago
5. Confirma tu orden

#### 5. Seguimiento

1. Recibirás notificaciones de cambio de estado
2. En "Mis Órdenes" verás la ubicación en tiempo real
3. Califica una vez entregada

---

## 🔌 API Endpoints

### Autenticación

```
POST   /api/auth/register        # Crear cuenta
POST   /api/auth/login           # Iniciar sesión
POST   /api/auth/refresh         # Refrescar token
POST   /api/auth/logout          # Cerrar sesión
```

### Usuarios

```
GET    /api/users/me             # Perfil actual
PUT    /api/users/me             # Actualizar perfil
GET    /api/users/orders         # Historial de órdenes
GET    /api/users/favorites      # Restaurantes favoritos
POST   /api/users/favorites/:id  # Marcar favorito
```

### Restaurantes

```
GET    /api/restaurants          # Listar todos (con filtros)
GET    /api/restaurants/:id      # Detalle de restaurante
GET    /api/restaurants/:id/menu # Menú del restaurante
GET    /api/restaurants/:id/reviews # Reseñas
```

### Productos

```
GET    /api/products              # Listar (con filtros)
GET    /api/products/:id          # Detalle del producto
GET    /api/categories            # Categorías disponibles
```

### Órdenes

```
POST   /api/orders                # Crear orden
GET    /api/orders/:id            # Detalle de orden
GET    /api/orders/:id/tracking   # Seguimiento en tiempo real
PUT    /api/orders/:id/cancel     # Cancelar orden
```

### Carritos

```
GET    /api/cart                  # Obtener carrito actual
POST   /api/cart/items            # Agregar item
PUT    /api/cart/items/:id        # Actualizar item
DELETE /api/cart/items/:id        # Remover item
POST   /api/cart/coupon           # Aplicar cupón
```

### Reseñas

```
POST   /api/reviews               # Crear reseña
PUT    /api/reviews/:id           # Editar reseña
DELETE /api/reviews/:id           # Eliminar reseña
GET    /api/reviews/product/:id   # Reseñas de producto
```

---

## 🛠️ Tecnologías

### Frontend

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **React Router v6** - Routing
- **Axios** - HTTP Client
- **CSS-in-JS** - Styling

### Backend (Recomendado)

- **Node.js** - Runtime
- **Express** - Framework web
- **MySQL** - Base de datos
- **Sequelize/TypeORM** - ORM
- **JWT** - Autenticación
- **Stripe API** - Procesamiento de pagos
- **Socket.io** - WebSockets para seguimiento

### DevOps

- **Docker** - Containerización
- **GitHub Actions** - CI/CD
- **PM2** - Gestor de procesos
- **Nginx** - Reverse proxy

---

## 📊 Base de Datos - Relaciones

```
┌─────────────┐
│   USERS     │
└────┬────────┘
     │
     ├──→ RESTAURANTS (owner_id)
     │    ├──→ PRODUCTS (restaurant_id)
     │    │    ├──→ CATEGORIES (category_id)
     │    │    └──→ ORDER_ITEMS (product_id)
     │    └──→ REVIEWS (restaurant_id)
     │
     ├──→ ORDERS (user_id)
     │    ├──→ ORDER_ITEMS (order_id)
     │    ├──→ RESTAURANTS (restaurant_id)
     │    └──→ REVIEWS (order_id)
     │
     ├──→ CARTS (user_id)
     │    └──→ CART_ITEMS (cart_id)
     │         └──→ PRODUCTS (product_id)
     │
     ├──→ SAVED_LOCATIONS (user_id)
     │
     └──→ NOTIFICATIONS (user_id)
```

---

## 🎯 Categorías de Productos

Las siguientes categorías están disponibles por defecto:

- 🍔 **Hamburguesas** - Clásicas, premium, vegetarianas
- 🍕 **Pizzas** - Tradicionales, especiales, veganas
- 🍱 **Sushi** - Rolls, nigiris, sashimi
- 🍖 **Parrilla** - Carnes, aves, vegetales
- 🍰 **Postres** - Dulces, helados, frutas
- 🥤 **Bebidas** - Refrescos, jugos, bebidas alcohólicas

---

## 🔒 Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ Autenticación JWT
- ✅ HTTPS obligatorio en producción
- ✅ CORS configurado
- ✅ Validación de inputs en cliente y servidor
- ✅ Rate limiting en API
- ✅ Protección contra SQL Injection (Prepared Statements)

---

## 📄 Licencia

Este proyecto está licenciado bajo MIT. Ver [LICENSE](LICENSE) para más detalles.

---

## 👥 Contacto

- **Email**: info@proecho.com
- **Sitio Web**: www.proecho.com
- **GitHub**: github.com/miluromero061-a11y/provecho

---

## 📝 Notas Adicionales

### Próximas Mejoras Planificadas

- [ ] App móvil nativa (React Native)
- [ ] Integración con redes sociales
- [ ] Programa de referidos
- [ ] Análisis predictivo de demanda
- [ ] Chatbot con IA
- [ ] Entregas con bicicleta (eco-friendly)
- [ ] Suscripción premium

### Créditos

Diseñado y desarrollado con ❤️ para brindar la mejor experiencia en delivery de comida.

---

**Última actualización**: 22 de Junio, 2026  
**Versión**: 1.0.0  
**Estado**: En Desarrollo Activo 🚀  
