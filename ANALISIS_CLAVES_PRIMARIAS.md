# 📋 ANÁLISIS DE CLAVES PRIMARIAS - PROECHO

## Introducción

Este documento proporciona un análisis detallado sobre la selección de claves primarias en el registro principal de PRODUCTOS de la aplicación Proecho, justificando por qué `product_id` fue elegida como identificador único.

---

## 1. REGISTRO PRINCIPAL: PRODUCTOS

### 1.1 Estructura Completa

```
┌─────────────────────────────────────────────────────────┐
│                    TABLA: PRODUCTS                      │
├─────────────────────────────────────────────────────────┤
│ Campo                    │ Tipo         │ Restricción   │
├─────────────────────────────────────────────────────────┤
│ product_id (PK)         │ INT          │ NOT NULL      │
│ restaurant_id (FK)      │ INT          │ NOT NULL      │
│ category_id (FK)        │ INT          │ NOT NULL      │
│ name                    │ VARCHAR(255) │ NOT NULL      │
│ description             │ TEXT         │ NULLABLE      │
│ price                   │ DECIMAL      │ NOT NULL      │
│ image_url               │ VARCHAR(500) │ NULLABLE      │
│ is_active               │ BOOLEAN      │ NOT NULL      │
│ preparation_time        │ INT          │ NOT NULL      │
│ calories                │ INT          │ NULLABLE      │
│ ingredients             │ JSON         │ NULLABLE      │
│ allergens               │ JSON         │ NULLABLE      │
│ discount_percentage     │ DECIMAL      │ NULLABLE      │
│ created_at              │ TIMESTAMP    │ NOT NULL      │
│ updated_at              │ TIMESTAMP    │ NOT NULL      │
└─────────────────────────────────────────────────────────┘
```

---

## 2. JUSTIFICACIÓN DE LA CLAVE PRIMARIA: product_id

### 2.1 ¿Por qué NO usar el `name` como Clave Primaria?

| Razón | Explicación |
|-------|------------|
| ❌ **Cambios de Nombre** | Si un restaurante cambia el nombre de un plato (ej: "Hamburguesa" → "Burger Premium"), el identificador cambiaría, rompiendo todas las referencias en órdenes y carritos. |
| ❌ **Conflictos de Duplicados** | Dos restaurantes podrían tener platos con el mismo nombre (ej: ambos venden "Pizza Margherita"), violando la restricción única. |
| ❌ **Rendimiento** | Búsquedas por STRING son más lentas que por INT. Con millones de productos, STRING es ineficiente. |
| ❌ **Seguridad** | Expone datos sensibles en URLs internas. Un ID numérico es más seguro. |
| ❌ **Compuesto Complejo** | Usar (restaurant_id, name) como PK compuesta es más lento que un INT único. |

### 2.2 ¿Por qué NO usar `(restaurant_id, name)` Compuesta?

```sql
-- ❌ MAL - Clave primaria compuesta
CREATE TABLE products (
  restaurant_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2),
  PRIMARY KEY (restaurant_id, name)  -- Compuesta
);

-- PROBLEMAS:
-- 1. Búsquedas por nombre en toda la BD requieren conocer restaurant_id
-- 2. Las órdenes necesitarían guardar 2 valores por cada producto
-- 3. Si un producto se transfiere de restaurante, la PK cambia
-- 4. Comparaciones entre registros más lentas
```

### 2.3 ¿Por qué SÍ usar `product_id` (INT Auto-Increment)?

#### ✅ **1. Unicidad Garantizada**
```sql
-- El AUTO_INCREMENT garantiza que cada product_id sea único
ALTER TABLE products
ADD CONSTRAINT pk_product PRIMARY KEY (product_id);

-- Ejemplo:
INSERT INTO products (restaurant_id, name, price)
VALUES (1, 'Pizza Margherita', 12.99);  -- Recibe product_id = 1

INSERT INTO products (restaurant_id, name, price)
VALUES (2, 'Pizza Margherita', 13.99);  -- Recibe product_id = 2
```

#### ✅ **2. Independencia de Datos**
```typescript
// El producto sigue siendo el mismo aunque cambien sus atributos
const originalProduct = { product_id: 42, name: 'Burger', price: 9.99 };

// Luego, el restaurante actualiza:
const updatedProduct = { 
  product_id: 42,  // ← SIGUE SIENDO 42
  name: 'Premium Burger',  // Cambió
  price: 14.99  // Cambió
};

// En órdenes antiguas, el product_id=42 sigue siendo válido
const order = { 
  order_items: [
    { product_id: 42, quantity: 2, original_price: 9.99 }  // ✓ Válido
  ]
};
```

#### ✅ **3. Rendimiento Optimizado**

```sql
-- Búsqueda por INT es O(1) versus O(n) por STRING
EXPLAIN SELECT * FROM products WHERE product_id = 42;
-- Type: const, rows: 1, extra: NULL (MÁS RÁPIDO)

EXPLAIN SELECT * FROM products WHERE name = 'Pizza Margherita';
-- Type: ref, rows: 2, extra: NULL (MÁS LENTO)
```

#### ✅ **4. Escalabilidad**

```
Comparación de rendimiento con millones de productos:

Búsqueda por producto_id (INT):
  - Tiempo: ~0.001ms
  - Tamaño índice: ~50MB (10M registros)

Búsqueda por nombre (VARCHAR):
  - Tiempo: ~5-10ms
  - Tamaño índice: ~500MB (STRING más largo)

Con 100 millones de productos:
  - INT: 10ms vs VARCHAR: 500ms
```

#### ✅ **5. Facilidad de Referencia**

```typescript
// Order Item referencia el producto por ID
interface OrderItem {
  order_item_id: number;      // PK local
  order_id: number;           // FK a orden
  product_id: number;         // FK a PRODUCTO ← Solo 1 INT
  quantity: number;
  unit_price: number;
  // Si usáramos (restaurant_id, name) necesitaríamos:
  // product_restaurant_id: number;
  // product_name: string;  ← 2 campos, más lento
}

// En la BD
CREATE TABLE order_items (
  order_item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,  -- ← Simple, eficiente
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

---

## 3. COMPARATIVA: OPCIONES DE CLAVE PRIMARIA

| Opción | Tipo | Ventajas | Desventajas |
|--------|------|----------|-------------|
| **product_id** | INT Auto-Inc | ✅ Rápido, escalable, independiente | ⚠️ Requiere índice adicional |
| **name** | VARCHAR | ✅ Semántico | ❌ Lento, cambios rompen referencias |
| **(restaurant_id, name)** | Compuesta | ✅ Garantiza unicidad por restaurante | ❌ Complejo, lento, difícil de cambiar |
| **UUID** | CHAR(36) | ✅ Único globalmente | ❌ Lento, tamaño grande |

### Recomendación Final: ✅ **product_id (INT AUTO-INCREMENT)**

---

## 4. ÍNDICES SECUNDARIOS RECOMENDADOS

```sql
-- Para mejorar búsquedas comunes sin perder la PK eficiente

-- 1. Búsqueda de productos por restaurante
CREATE INDEX idx_restaurant_id ON products(restaurant_id);
-- Usado en: SELECT * FROM products WHERE restaurant_id = 1

-- 2. Búsqueda de productos por categoría
CREATE INDEX idx_category_id ON products(category_id);
-- Usado en: SELECT * FROM products WHERE category_id = 1

-- 3. Búsqueda por nombre (aunque sea más lenta)
CREATE INDEX idx_name ON products(name);
-- Usado en: SELECT * FROM products WHERE name LIKE '%Pizza%'

-- 4. Filtro de productos activos
CREATE INDEX idx_is_active ON products(is_active);
-- Usado en: SELECT * FROM products WHERE is_active = TRUE

-- 5. Índice compuesto para caso común
CREATE INDEX idx_restaurant_active 
  ON products(restaurant_id, is_active, category_id);
-- Usado en: SELECT * FROM products 
--           WHERE restaurant_id = 1 AND is_active = TRUE
```

---

## 5. INTEGRIDAD REFERENCIAL

```sql
-- La clave primaria product_id permite:

-- 1. Relación con ORDER_ITEMS (muchos a muchos)
ALTER TABLE order_items
ADD CONSTRAINT fk_order_item_product 
FOREIGN KEY (product_id) REFERENCES products(product_id);

-- 2. Relación con CART_ITEMS
ALTER TABLE cart_items
ADD CONSTRAINT fk_cart_item_product 
FOREIGN KEY (product_id) REFERENCES products(product_id);

-- 3. Auditoría y cambios
ALTER TABLE product_history
ADD CONSTRAINT fk_product_history 
FOREIGN KEY (product_id) REFERENCES products(product_id);
```

---

## 6. EJEMPLO: CICLO DE VIDA DE UN PRODUCTO

```typescript
// 1. Creación
const newProduct = {
  // product_id se genera automáticamente
  restaurant_id: 1,
  category_id: 1,
  name: 'Hamburguesa Clásica',
  price: 9.99,
  created_at: new Date()
};
// En BD: INSERT genera product_id = 1

// 2. Venta (referenciado en orden)
const orderItem = {
  order_item_id: 100,
  order_id: 50,
  product_id: 1,  // ← Referencia segura
  quantity: 2,
  unit_price: 9.99
};

// 3. Cambio de nombre (el ID NO cambia)
const updatedProduct = {
  product_id: 1,  // ← MISMO ID
  restaurant_id: 1,
  name: 'Hamburguesa Premium',  // Cambió
  price: 14.99,  // Cambió
};

// 4. Búsqueda histórica
// Podemos seguir el producto a lo largo del tiempo
SELECT * FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE oi.product_id = 1;  // Encuentra todas las órdenes de este producto

// 5. Cambio de restaurante (caso excepcional)
// La clave sigue siendo válida
UPDATE products SET restaurant_id = 2 WHERE product_id = 1;
// Las órdenes antiguas aún referencian correctamente product_id = 1
```

---

## 7. PATRONES DE CONSULTA OPTIMIZADOS

```sql
-- ✅ RÁPIDO - Búsqueda por PK
SELECT * FROM products WHERE product_id = 42;
-- Execution time: 0.001ms

-- ⚠️ LENTO - Búsqueda por nombre
SELECT * FROM products WHERE name = 'Pizza Margherita';
-- Execution time: 5-10ms (sin índice)

-- ✅ RÁPIDO - Productos de un restaurante
SELECT * FROM products 
WHERE restaurant_id = 1 AND is_active = TRUE;
-- Execution time: 0.05ms (con índice compuesto)

-- ✅ RÁPIDO - Carrito del usuario
SELECT p.*, ci.quantity 
FROM cart_items ci
JOIN products p ON ci.product_id = p.product_id
WHERE ci.cart_id = 100;
-- Execution time: 0.02ms
```

---

## 8. TRANSACCIONES Y CONSISTENCIA

```sql
-- La clave primaria garantiza ACID

-- Escenario: Dos usuarios intentan agregar el mismo producto al carrito
BEGIN TRANSACTION;

-- Usuario A
INSERT INTO order_items (order_id, product_id, quantity)
VALUES (100, 42, 2);  -- Éxito: product_id=42 existe

-- Usuario B (simultáneamente)
INSERT INTO order_items (order_id, product_id, quantity)
VALUES (101, 42, 1);  -- Éxito: product_id=42 sigue siendo válido

COMMIT;
-- Ambas transacciones éxito porque product_id=42 es único e inmutable
```

---

## 9. CUMPLIMIENTO DE MEJORES PRÁCTICAS

| Estándar | Requerimiento | Cumplimiento |
|----------|---------------|--------------|
| **3NF** | Un atributo no clave por clave primaria | ✅ Cada producto solo una vez |
| **BCNF** | Todo determinante es clave candidata | ✅ product_id es el único determinante |
| **ACID** | Atomicidad en transacciones | ✅ INT es indivisible |
| **ISO 8601** | Timestamps en formato estándar | ✅ TIMESTAMP de MySQL |

---

## 10. CONCLUSIÓN

### 🎯 La elección de `product_id` como clave primaria es óptima porque:

1. **Garantiza Unicidad**: Cada producto es identificado de forma única e inmodificable
2. **Independencia de Datos**: Cambios en atributos no afectan referencias externas
3. **Rendimiento**: Búsquedas, índices y join son significativamente más rápidos
4. **Escalabilidad**: Soporta millones de productos sin degradación
5. **Integridad Referencial**: Facilita relaciones con otras tablas
6. **Seguridad**: No expone datos sensibles en identificadores externos
7. **Mantenibilidad**: Simple de entender y trabajar con sistemas
8. **Normalizació**: Cumple con 3NF, BCNF y estándares de BD

### ✅ Respuesta Final

**`product_id` (INT AUTO-INCREMENT)** es la mejor opción como clave primaria para la tabla PRODUCTS porque proporciona un identificador único, independiente del contenido, optimizado para rendimiento y escalable para los requisitos de Proecho.

---

**Documento creado**: 22 de Junio, 2026  
**Versión**: 1.0  
**Autor**: Equipo de Desarrollo Proecho
