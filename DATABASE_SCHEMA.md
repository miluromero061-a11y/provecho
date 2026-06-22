# 📊 Esquema de Base de Datos - Proecho

## Descripción General
Proecho es una plataforma de delivery gastronómico que conecta usuarios con restaurantes. A continuación se documenta el esquema de registros principales con identificación clara de claves primarias y justificación.

---

## 🔑 REGISTRO PRINCIPAL 1: PRODUCTOS (Productos/Menú)

### Propósito
Almacenar información de todos los productos (platos) ofrecidos por los restaurantes.

### Estructura del Registro

| Campo | Tipo de Dato | Null | Restricciones | Descripción |
|-------|-------------|------|---------------|-------------|
| **product_id** | INT | NO | PK, Auto Increment | Identificador único del producto |
| restaurant_id | INT | NO | FK | Referencia al restaurante propietario |
| category_id | INT | NO | FK | Categoría del producto (hamburguesa, pizza, etc.) |
| name | VARCHAR(255) | NO | Unique | Nombre del producto |
| description | TEXT | SÍ | - | Descripción detallada del producto |
| price | DECIMAL(10,2) | NO | CHECK (price > 0) | Precio en moneda local |
| image_url | VARCHAR(500) | SÍ | - | URL de la imagen del producto |
| is_active | BOOLEAN | NO | Default: TRUE | Indica si el producto está disponible |
| preparation_time | INT | NO | - | Tiempo de preparación en minutos |
| calories | INT | SÍ | - | Valor calórico (información nutricional) |
| ingredients | JSON | SÍ | - | Lista de ingredientes en formato JSON |
| allergens | JSON | SÍ | - | Alérgenos identificados |
| discount_percentage | DECIMAL(5,2) | SÍ | - | Porcentaje de descuento si aplica |
| created_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Fecha de última actualización |

### 🔑 CLAVE PRIMARIA: `product_id`

#### Justificación de la Elección:

1. **Unicidad Garantizada**: El `product_id` es un identificador único auto-incrementable que garantiza que cada producto sea univoco en el sistema.

2. **Independencia de Datos**: A diferencia de usar el nombre del producto, un ID numérico no cambia si se actualiza el nombre, evitando problemas de referencia.

3. **Rendimiento**: Las búsquedas por ID entero son más rápidas que búsquedas por texto (nombres).

4. **Escalabilidad**: Permite manejo eficiente de millones de productos sin impacto en rendimiento.

5. **Facilidad de Referencia**: Otros registros (órdenes, reseñas, carritos) pueden referenciar este producto fácilmente mediante una clave foránea.

6. **Identificación Visual**: Aunque el usuario ve el nombre, internamente el sistema usa el ID para todas las operaciones.

### Índices Recomendados
```sql
CREATE INDEX idx_restaurant_id ON products(restaurant_id);
CREATE INDEX idx_category_id ON products(category_id);
CREATE INDEX idx_name ON products(name);
CREATE INDEX idx_is_active ON products(is_active);
```

---

## 🔑 REGISTRO PRINCIPAL 2: USUARIOS

### Estructura del Registro

| Campo | Tipo de Dato | Null | Restricciones | Descripción |
|-------|-------------|------|---------------|-------------|
| **user_id** | INT | NO | PK, Auto Increment | Identificador único del usuario |
| email | VARCHAR(255) | NO | Unique | Email único para acceso |
| phone | VARCHAR(20) | NO | Unique | Teléfono de contacto |
| password_hash | VARCHAR(255) | NO | - | Hash seguro de la contraseña |
| first_name | VARCHAR(100) | NO | - | Nombre del usuario |
| last_name | VARCHAR(100) | NO | - | Apellido del usuario |
| profile_image_url | VARCHAR(500) | SÍ | - | Foto de perfil |
| date_of_birth | DATE | SÍ | - | Fecha de nacimiento |
| preferred_address | VARCHAR(500) | SÍ | - | Dirección de entrega preferida |
| total_orders | INT | NO | Default: 0 | Total de órdenes realizadas |
| total_spent | DECIMAL(12,2) | NO | Default: 0 | Total gastado |
| loyalty_points | INT | NO | Default: 0 | Puntos de lealtad acumulados |
| is_verified | BOOLEAN | NO | Default: FALSE | Email verificado |
| created_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Fecha de registro |
| updated_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Última actualización |

### 🔑 CLAVE PRIMARIA: `user_id`

#### Justificación de la Elección:

1. **Independencia de Credenciales**: Si el usuario cambia email o teléfono, el ID permanece igual, evitando inconsistencias.

2. **Seguridad**: El ID no expone datos sensibles como email, a diferencia de usar email como clave primaria.

3. **Relaciones Consistentes**: Todas las órdenes, reseñas y favoritos pueden referenciar el usuario mediante su ID de forma estable.

4. **Rendimiento de Búsqueda**: Las búsquedas internas por ID son O(1) versus búsquedas por email que son O(n).

5. **Cumplimiento RGPD**: Si un usuario solicita eliminación, cambiar el ID es más simple que manejar referencias por email.

---

## 🔑 REGISTRO PRINCIPAL 3: ÓRDENES

### Estructura del Registro

| Campo | Tipo de Dato | Null | Restricciones | Descripción |
|-------|-------------|------|---------------|-------------|
| **order_id** | INT | NO | PK, Auto Increment | Identificador único de la orden |
| user_id | INT | NO | FK | Usuario que realizó la orden |
| restaurant_id | INT | NO | FK | Restaurante que prepara la orden |
| order_number | VARCHAR(20) | NO | Unique | Número de seguimiento visible al usuario |
| total_amount | DECIMAL(12,2) | NO | - | Monto total incluyendo impuestos |
| subtotal | DECIMAL(12,2) | NO | - | Subtotal antes de impuestos |
| tax_amount | DECIMAL(10,2) | NO | - | Impuesto |
| delivery_fee | DECIMAL(10,2) | NO | - | Costo de envío |
| discount_applied | DECIMAL(10,2) | NO | Default: 0 | Descuento aplicado |
| status | ENUM | NO | - | Estado: 'pending', 'confirmed', 'preparing', 'ready', 'on_delivery', 'delivered', 'cancelled' |
| payment_method | VARCHAR(50) | NO | - | Método: 'credit_card', 'debit_card', 'wallet', 'cash' |
| delivery_address | VARCHAR(500) | NO | - | Dirección de entrega |
| delivery_latitude | DECIMAL(10,8) | SÍ | - | Coordenada GPS de entrega |
| delivery_longitude | DECIMAL(11,8) | SÍ | - | Coordenada GPS de entrega |
| estimated_delivery_time | DATETIME | SÍ | - | Hora estimada de entrega |
| actual_delivery_time | DATETIME | SÍ | - | Hora real de entrega |
| delivery_driver_id | INT | SÍ | FK | ID del repartidor asignado |
| special_instructions | TEXT | SÍ | - | Instrucciones especiales del cliente |
| created_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Fecha de creación |
| updated_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Última actualización |

### 🔑 CLAVE PRIMARIA: `order_id`

#### Justificación de la Elección:

1. **Secuencia Única**: Cada orden es única e irreproducible, requiere un identificador único.

2. **Seguimiento en Tiempo Real**: El `order_id` se usa para GPS, notificaciones y actualizaciones en vivo.

3. **Auditoría**: Cada transacción financiera requiere un registro único e irrefutable.

4. **Escalabilidad**: Miles de órdenes simultáneas requieren identificación eficiente.

5. **Integridad de Datos**: Previene duplicados de órdenes y asegura cada orden sea procesada una sola vez.

---

## 🔑 REGISTRO PRINCIPAL 4: RESTAURANTES

### Estructura del Registro

| Campo | Tipo de Dato | Null | Restricciones | Descripción |
|-------|-------------|------|---------------|-------------|
| **restaurant_id** | INT | NO | PK, Auto Increment | Identificador único del restaurante |
| name | VARCHAR(255) | NO | Unique | Nombre del restaurante |
| owner_id | INT | NO | FK | Propietario del restaurante |
| description | TEXT | SÍ | - | Descripción del restaurante |
| cuisine_type | VARCHAR(100) | NO | - | Tipo de cocina (italiana, china, etc.) |
| logo_url | VARCHAR(500) | SÍ | - | Logo del restaurante |
| banner_image_url | VARCHAR(500) | SÍ | - | Banner de portada |
| address | VARCHAR(500) | NO | - | Dirección física |
| latitude | DECIMAL(10,8) | NO | - | Coordenada GPS |
| longitude | DECIMAL(11,8) | NO | - | Coordenada GPS |
| phone | VARCHAR(20) | NO | - | Teléfono de contacto |
| email | VARCHAR(255) | NO | - | Email del restaurante |
| average_rating | DECIMAL(3,2) | NO | Default: 0 | Calificación promedio |
| total_reviews | INT | NO | Default: 0 | Total de reseñas |
| delivery_time_minutes | INT | NO | - | Tiempo promedio de entrega |
| minimum_order_amount | DECIMAL(10,2) | NO | - | Monto mínimo de pedido |
| delivery_radius_km | INT | NO | - | Radio de cobertura de entrega |
| is_open | BOOLEAN | NO | Default: TRUE | Estado operativo actual |
| opening_time | TIME | NO | - | Hora de apertura |
| closing_time | TIME | NO | - | Hora de cierre |
| is_verified | BOOLEAN | NO | Default: FALSE | Restaurante verificado |
| total_orders | INT | NO | Default: 0 | Total de órdenes |
| created_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Fecha de registro |
| updated_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Última actualización |

### 🔑 CLAVE PRIMARIA: `restaurant_id`

#### Justificación de la Elección:

1. **Identificación Empresarial**: Cada negocio necesita un ID único independiente de su nombre.

2. **Cambios Administrativos**: Si el restaurante cambia de nombre, el ID se mantiene constante.

3. **Relaciones Complejas**: Múltiples registros (productos, órdenes, reseñas) referencian al restaurante.

4. **Análisis y Reportes**: Facilita análisis histórico incluso si el negocio cambia de nombre.

---

## 🔑 REGISTRO COMPLEMENTARIO: ITEMS DE ORDEN

### Estructura del Registro

| Campo | Tipo de Dato | Null | Restricciones | Descripción |
|-------|-------------|------|---------------|-------------|
| **order_item_id** | INT | NO | PK, Auto Increment | ID único del item en la orden |
| order_id | INT | NO | FK | Referencia a la orden |
| product_id | INT | NO | FK | Referencia al producto |
| quantity | INT | NO | CHECK (quantity > 0) | Cantidad solicitada |
| unit_price | DECIMAL(10,2) | NO | - | Precio unitario al momento de la compra |
| total_price | DECIMAL(12,2) | NO | - | Subtotal (unit_price * quantity) |
| special_requests | TEXT | SÍ | - | Solicitudes especiales (sin cebolla, etc.) |
| created_at | TIMESTAMP | NO | Default: CURRENT_TIMESTAMP | Fecha de adición |

### 🔑 CLAVE PRIMARIA: `order_item_id`

---

## 📋 Relaciones de Claves Foráneas (Foreign Keys)

```
PRODUCTS.restaurant_id → RESTAURANTS.restaurant_id
PRODUCTS.category_id → CATEGORIES.category_id

ORDERS.user_id → USERS.user_id
ORDERS.restaurant_id → RESTAURANTS.restaurant_id
ORDERS.delivery_driver_id → DELIVERY_DRIVERS.driver_id

ORDER_ITEMS.order_id → ORDERS.order_id
ORDER_ITEMS.product_id → PRODUCTS.product_id

RESTAURANTS.owner_id → USERS.user_id
```

---

## 🎨 Consideraciones de Diseño

### Normalización
- **3NF**: Todos los registros están normalizados a tercera forma normal.
- **Sin Redundancias**: Los datos se almacenan una sola vez.
- **Integridad Referencial**: Asegurada mediante Foreign Keys.

### Rendimiento
- Índices en foreign keys para joins rápidos.
- Índices en campos frecuentemente consultados.
- Particionamiento temporal para tabla de órdenes (por fecha).

### Seguridad
- Contraseñas almacenadas como hash (nunca en texto plano).
- GPS de entrega solo tras confirmación de delivery.
- Auditoría de cambios en órdenes y pagos.

---

## 📐 Diagrama Entidad-Relación (ER)

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ user_id (PK)    │
│ email           │
│ phone           │
│ password_hash   │
│ first_name      │
│ last_name       │
└─────────────────┘
        │
        │ owner_id
        └──────────────────────┐
                               │
                    ┌──────────────────────┐
                    │   RESTAURANTS       │
                    ├──────────────────────┤
                    │ restaurant_id (PK)   │
                    │ name                 │
                    │ address              │
                    │ phone                │
                    │ average_rating       │
                    │ owner_id (FK)        │
                    └──────────────────────┘
                            │
                            │ restaurant_id
        ┌───────────────────┴────────────────────┐
        │                                        │
   ┌─────────────────┐                ┌──────────────────┐
   │    PRODUCTS     │                │  ORDERS          │
   ├─────────────────┤                ├──────────────────┤
   │ product_id (PK) │                │ order_id (PK)    │
   │ name            │                │ user_id (FK)     │
   │ price           │                │ restaurant_id(FK)│
   │ restaurant_id   │                │ total_amount     │
   │ (FK)            │                │ status           │
   └─────────────────┘                │ created_at       │
        │                             └──────────────────┘
        │ product_id                         │
        │                                    │ order_id
        │                      ┌─────────────┘
        │                      │
        │              ┌───────────────────┐
        │              │  ORDER_ITEMS      │
        │              ├───────────────────┤
        │              │ order_item_id (PK)│
        │              │ order_id (FK)     │
        └──────────────│ product_id (FK)   │
                       │ quantity          │
                       │ unit_price        │
                       └───────────────────┘
```

---

## 📌 Convenciones de Nomenclatura

- **Claves Primarias**: `{tabla_singular}_id`
- **Claves Foráneas**: `{tabla_referenciada_singular}_id`
- **Booleanos**: Prefijo `is_` o `has_`
- **Timestamps**: `created_at`, `updated_at`
- **Montantes**: Tipo `DECIMAL` con 2 decimales
- **Coordenadas**: Tipo `DECIMAL` con 8-10 decimales

---

**Última actualización**: 22 de Junio, 2026  
**Versión**: 1.0
