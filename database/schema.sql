-- ===============================================
-- ESQUEMA SQL - BASE DE DATOS PROECHO
-- ===============================================
-- Descripción: Script SQL para crear todas las tablas
-- de la aplicación Proecho con sus claves primarias,
-- restricciones y relaciones.
-- ===============================================

-- ===============================================
-- TABLA: USUARIOS
-- PK: user_id
-- ===============================================
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  profile_image_url VARCHAR(500),
  date_of_birth DATE,
  preferred_address VARCHAR(500),
  total_orders INT NOT NULL DEFAULT 0,
  total_spent DECIMAL(12,2) NOT NULL DEFAULT 0,
  loyalty_points INT NOT NULL DEFAULT 0,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Índices para optimizar búsquedas frecuentes
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: RESTAURANTES
-- PK: restaurant_id
-- FK: owner_id -> users.user_id
-- ===============================================
CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  owner_id INT NOT NULL,
  description TEXT,
  cuisine_type VARCHAR(100) NOT NULL,
  logo_url VARCHAR(500),
  banner_image_url VARCHAR(500),
  address VARCHAR(500) NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  average_rating DECIMAL(3,2) NOT NULL DEFAULT 0,
  total_reviews INT NOT NULL DEFAULT 0,
  delivery_time_minutes INT NOT NULL,
  minimum_order_amount DECIMAL(10,2) NOT NULL,
  delivery_radius_km INT NOT NULL,
  is_open BOOLEAN NOT NULL DEFAULT TRUE,
  opening_time TIME NOT NULL,
  closing_time TIME NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  total_orders INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  CONSTRAINT fk_restaurant_owner FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE,
  
  -- Índices
  INDEX idx_owner_id (owner_id),
  INDEX idx_name (name),
  INDEX idx_average_rating (average_rating),
  INDEX idx_is_open (is_open),
  INDEX idx_cuisine_type (cuisine_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: CATEGORÍAS DE PRODUCTOS
-- PK: category_id
-- ===============================================
CREATE TABLE IF NOT EXISTS categories (
  category_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon_url VARCHAR(500),
  color VARCHAR(7) NOT NULL DEFAULT '#FF9500',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_name (name),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar categorías iniciales
INSERT INTO categories (name, icon_url, color) VALUES 
('Hamburguesas', '/icons/burger.png', '#FF9500'),
('Pizzas', '/icons/pizza.png', '#FF9500'),
('Sushi', '/icons/sushi.png', '#FF9500'),
('Parrilla', '/icons/grill.png', '#FF9500'),
('Postres', '/icons/dessert.png', '#FF9500'),
('Bebidas', '/icons/drink.png', '#FF9500');

-- ===============================================
-- TABLA: PRODUCTOS
-- PK: product_id
-- FK: restaurant_id -> restaurants.restaurant_id
-- FK: category_id -> categories.category_id
-- ===============================================
CREATE TABLE IF NOT EXISTS products (
  product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  restaurant_id INT NOT NULL,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price > 0),
  image_url VARCHAR(500),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  preparation_time INT NOT NULL,
  calories INT,
  ingredients JSON,
  allergens JSON,
  discount_percentage DECIMAL(5,2),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  CONSTRAINT fk_product_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
  CONSTRAINT fk_product_category FOREIGN KEY (category_id) REFERENCES categories(category_id),
  
  -- Índices
  INDEX idx_restaurant_id (restaurant_id),
  INDEX idx_category_id (category_id),
  INDEX idx_name (name),
  INDEX idx_is_active (is_active),
  UNIQUE KEY uk_restaurant_product_name (restaurant_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: ÓRDENES
-- PK: order_id
-- FK: user_id -> users.user_id
-- FK: restaurant_id -> restaurants.restaurant_id
-- FK: delivery_driver_id -> delivery_drivers.driver_id (si existe)
-- ===============================================
CREATE TABLE IF NOT EXISTS orders (
  order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  order_number VARCHAR(20) NOT NULL UNIQUE,
  total_amount DECIMAL(12,2) NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  tax_amount DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL,
  discount_applied DECIMAL(10,2) NOT NULL DEFAULT 0,
  status ENUM('pending', 'confirmed', 'preparing', 'ready', 'on_delivery', 'delivered', 'cancelled') 
    NOT NULL DEFAULT 'pending',
  payment_method ENUM('credit_card', 'debit_card', 'wallet', 'cash') NOT NULL,
  delivery_address VARCHAR(500) NOT NULL,
  delivery_latitude DECIMAL(10,8),
  delivery_longitude DECIMAL(11,8),
  estimated_delivery_time DATETIME,
  actual_delivery_time DATETIME,
  delivery_driver_id INT,
  special_instructions TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_order_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
  
  -- Índices
  INDEX idx_user_id (user_id),
  INDEX idx_restaurant_id (restaurant_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_order_number (order_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: ITEMS DE ORDEN
-- PK: order_item_id
-- FK: order_id -> orders.order_id
-- FK: product_id -> products.product_id
-- ===============================================
CREATE TABLE IF NOT EXISTS order_items (
  order_item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(12,2) NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  CONSTRAINT fk_order_item_order FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  CONSTRAINT fk_order_item_product FOREIGN KEY (product_id) REFERENCES products(product_id),
  
  -- Índices
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: RESEÑAS Y CALIFICACIONES
-- PK: review_id
-- FK: order_id -> orders.order_id
-- FK: user_id -> users.user_id
-- FK: restaurant_id -> restaurants.restaurant_id
-- ===============================================
CREATE TABLE IF NOT EXISTS reviews (
  review_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255) NOT NULL,
  comment TEXT NOT NULL,
  is_verified_purchase BOOLEAN NOT NULL DEFAULT TRUE,
  helpful_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  CONSTRAINT fk_review_order FOREIGN KEY (order_id) REFERENCES orders(order_id),
  CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(user_id),
  CONSTRAINT fk_review_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
  
  -- Índices
  INDEX idx_restaurant_id (restaurant_id),
  INDEX idx_user_id (user_id),
  INDEX idx_rating (rating),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: CUPONES DE DESCUENTO
-- PK: coupon_id
-- ===============================================
CREATE TABLE IF NOT EXISTS coupons (
  coupon_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  discount_type ENUM('percentage', 'fixed') NOT NULL,
  discount_value DECIMAL(10,2) NOT NULL,
  max_discount_amount DECIMAL(10,2),
  min_order_amount DECIMAL(10,2) NOT NULL,
  valid_from DATETIME NOT NULL,
  valid_until DATETIME NOT NULL,
  usage_limit INT,
  usage_per_user INT,
  applicable_restaurants JSON,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_code (code),
  INDEX idx_valid_from (valid_from),
  INDEX idx_valid_until (valid_until),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: CARRITO DE COMPRAS
-- PK: cart_id
-- FK: user_id -> users.user_id
-- FK: restaurant_id -> restaurants.restaurant_id
-- ===============================================
CREATE TABLE IF NOT EXISTS carts (
  cart_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(12,2) NOT NULL DEFAULT 0,
  coupon_code VARCHAR(50),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
  
  -- Índices
  INDEX idx_user_id (user_id),
  INDEX idx_restaurant_id (restaurant_id),
  UNIQUE KEY uk_user_restaurant_cart (user_id, restaurant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: ITEMS DEL CARRITO
-- PK: cart_item_id
-- FK: cart_id -> carts.cart_id
-- FK: product_id -> products.product_id
-- ===============================================
CREATE TABLE IF NOT EXISTS cart_items (
  cart_item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cart_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  special_requests TEXT,
  
  -- Claves foráneas
  CONSTRAINT fk_cart_item_cart FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE,
  CONSTRAINT fk_cart_item_product FOREIGN KEY (product_id) REFERENCES products(product_id),
  
  -- Índices
  INDEX idx_cart_id (cart_id),
  INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: NOTIFICACIONES
-- PK: notification_id
-- FK: user_id -> users.user_id
-- ===============================================
CREATE TABLE IF NOT EXISTS notifications (
  notification_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('order_confirmed', 'order_preparing', 'order_ready', 
            'order_on_delivery', 'order_delivered', 'promotional', 'system') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  related_order_id INT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  
  -- Índices
  INDEX idx_user_id (user_id),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- TABLA: UBICACIONES GUARDADAS
-- PK: location_id
-- FK: user_id -> users.user_id
-- ===============================================
CREATE TABLE IF NOT EXISTS saved_locations (
  location_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  label VARCHAR(100) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  longitude DECIMAL(11,8) NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Claves foráneas
  CONSTRAINT fk_location_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  
  -- Índices
  INDEX idx_user_id (user_id),
  INDEX idx_is_primary (is_primary)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- ÍNDICES DE AUDITORÍA Y BÚSQUEDA
-- ===============================================

-- Índices compuestos para búsquedas comunes
CREATE INDEX idx_user_created ON users(created_at DESC);
CREATE INDEX idx_order_user_date ON orders(user_id, created_at DESC);
CREATE INDEX idx_order_status_date ON orders(status, created_at DESC);
CREATE INDEX idx_product_restaurant_active ON products(restaurant_id, is_active);

-- ===============================================
-- VISTAS ÚTILES PARA CONSULTAS FRECUENTES
-- ===============================================

-- Vista: Resumen de órdenes del usuario
CREATE OR REPLACE VIEW v_user_order_summary AS
SELECT 
  o.order_id,
  o.order_number,
  u.user_id,
  u.first_name,
  u.email,
  r.restaurant_id,
  r.name AS restaurant_name,
  o.total_amount,
  o.status,
  o.created_at,
  COUNT(oi.order_item_id) AS items_count
FROM orders o
JOIN users u ON o.user_id = u.user_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id;

-- Vista: Estadísticas de restaurantes
CREATE OR REPLACE VIEW v_restaurant_stats AS
SELECT 
  r.restaurant_id,
  r.name,
  r.cuisine_type,
  COUNT(DISTINCT o.order_id) AS total_orders,
  AVG(rv.rating) AS avg_rating,
  SUM(o.total_amount) AS revenue_total,
  COUNT(DISTINCT o.user_id) AS unique_customers
FROM restaurants r
LEFT JOIN orders o ON r.restaurant_id = o.restaurant_id AND o.status = 'delivered'
LEFT JOIN reviews rv ON r.restaurant_id = rv.restaurant_id
GROUP BY r.restaurant_id;

-- ===============================================
-- FIN DEL ESQUEMA SQL
-- ===============================================
-- Último actualizado: 22 de Junio, 2026
-- Versión: 1.0
-- ===============================================
