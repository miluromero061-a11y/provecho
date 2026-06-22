-- ===============================================
-- EJEMPLOS DE CONSULTAS - PROECHO
-- ===============================================
-- Este archivo contiene ejemplos de consultas SQL
-- para operaciones comunes en la aplicación

-- ===============================================
-- 1. BÚSQUEDA DE PRODUCTOS
-- ===============================================

-- Buscar todos los productos de un restaurante activos
SELECT p.product_id, p.name, p.price, p.image_url
FROM products p
WHERE p.restaurant_id = 1 
  AND p.is_active = TRUE
ORDER BY p.category_id, p.name;

-- Buscar productos por categoría con descuentos
SELECT p.product_id, p.name, p.price,
       (p.price * (1 - p.discount_percentage/100)) AS discounted_price,
       p.discount_percentage
FROM products p
WHERE p.category_id = 1 
  AND p.is_active = TRUE
  AND p.discount_percentage > 0
ORDER BY p.discount_percentage DESC;

-- Buscar productos por nombre (búsqueda global)
SELECT p.product_id, p.name, r.name AS restaurant_name, p.price
FROM products p
JOIN restaurants r ON p.restaurant_id = r.restaurant_id
WHERE p.name LIKE '%Pizza%'
  AND p.is_active = TRUE
  AND r.is_open = TRUE
ORDER BY r.average_rating DESC;

-- ===============================================
-- 2. GESTIÓN DE ÓRDENES
-- ===============================================

-- Obtener detalles completos de una orden
SELECT 
  o.order_id,
  o.order_number,
  u.first_name,
  u.email,
  r.name AS restaurant_name,
  o.total_amount,
  o.status,
  o.created_at,
  COUNT(oi.order_item_id) AS total_items
FROM orders o
JOIN users u ON o.user_id = u.user_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
LEFT JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_id = 100
GROUP BY o.order_id;

-- Obtener items de una orden con detalles del producto
SELECT 
  oi.order_item_id,
  p.name,
  oi.quantity,
  oi.unit_price,
  (oi.quantity * oi.unit_price) AS subtotal,
  oi.special_requests
FROM order_items oi
JOIN products p ON oi.product_id = p.product_id
WHERE oi.order_id = 100
ORDER BY oi.order_item_id;

-- Obtener órdenes pendientes de un restaurante
SELECT 
  o.order_id,
  o.order_number,
  u.first_name,
  u.phone,
  o.total_amount,
  o.status,
  o.delivery_address,
  o.created_at
FROM orders o
JOIN users u ON o.user_id = u.user_id
WHERE o.restaurant_id = 1
  AND o.status IN ('pending', 'confirmed', 'preparing')
ORDER BY o.created_at ASC;

-- Obtener historial de órdenes del usuario
SELECT 
  o.order_id,
  o.order_number,
  r.name AS restaurant_name,
  o.total_amount,
  o.status,
  o.created_at
FROM orders o
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
WHERE o.user_id = 5
ORDER BY o.created_at DESC
LIMIT 10;

-- ===============================================
-- 3. ANÁLISIS DE PRODUCTOS Y VENTAS
-- ===============================================

-- Productos más vendidos
SELECT 
  p.product_id,
  p.name,
  r.name AS restaurant_name,
  COUNT(oi.order_item_id) AS total_sold,
  SUM(oi.quantity) AS total_quantity,
  AVG(oi.unit_price) AS avg_price
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
JOIN orders o ON oi.order_id = o.order_id
JOIN restaurants r ON p.restaurant_id = r.restaurant_id
WHERE o.status = 'delivered'
  AND o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY p.product_id
ORDER BY total_sold DESC
LIMIT 10;

-- Ingresos por restaurante (últimos 30 días)
SELECT 
  r.restaurant_id,
  r.name,
  COUNT(o.order_id) AS total_orders,
  SUM(o.total_amount) AS total_revenue,
  AVG(o.total_amount) AS avg_order_value,
  COUNT(DISTINCT o.user_id) AS unique_customers
FROM restaurants r
LEFT JOIN orders o ON r.restaurant_id = o.restaurant_id
  AND o.status = 'delivered'
  AND o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY r.restaurant_id
ORDER BY total_revenue DESC;

-- ===============================================
-- 4. ANÁLISIS DE USUARIOS
-- ===============================================

-- Usuarios más activos
SELECT 
  u.user_id,
  u.first_name,
  u.email,
  COUNT(o.order_id) AS total_orders,
  SUM(o.total_amount) AS total_spent,
  u.loyalty_points,
  MAX(o.created_at) AS last_order_date
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id AND o.status = 'delivered'
GROUP BY u.user_id
ORDER BY total_spent DESC
LIMIT 20;

-- Usuarios con no compras en últimos 30 días (churn)
SELECT u.user_id, u.first_name, u.email, MAX(o.created_at) AS last_purchase
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE u.created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.user_id
HAVING MAX(o.created_at) < DATE_SUB(NOW(), INTERVAL 30 DAY)
   OR MAX(o.created_at) IS NULL
LIMIT 50;

-- ===============================================
-- 5. GESTIÓN DE CALIFICACIONES Y RESEÑAS
-- ===============================================

-- Reseñas de un restaurante
SELECT 
  rv.review_id,
  rv.rating,
  rv.title,
  rv.comment,
  u.first_name,
  rv.created_at,
  rv.helpful_count
FROM reviews rv
JOIN users u ON rv.user_id = u.user_id
WHERE rv.restaurant_id = 1
ORDER BY rv.created_at DESC;

-- Calificación promedio y tendencias
SELECT 
  r.restaurant_id,
  r.name,
  r.average_rating,
  COUNT(rv.review_id) AS total_reviews,
  SUM(CASE WHEN rv.rating = 5 THEN 1 ELSE 0 END) AS five_star,
  SUM(CASE WHEN rv.rating = 4 THEN 1 ELSE 0 END) AS four_star,
  SUM(CASE WHEN rv.rating = 3 THEN 1 ELSE 0 END) AS three_star,
  SUM(CASE WHEN rv.rating = 2 THEN 1 ELSE 0 END) AS two_star,
  SUM(CASE WHEN rv.rating = 1 THEN 1 ELSE 0 END) AS one_star
FROM restaurants r
LEFT JOIN reviews rv ON r.restaurant_id = rv.restaurant_id
WHERE r.restaurant_id = 1
GROUP BY r.restaurant_id;

-- ===============================================
-- 6. DESCUENTOS Y CUPONES
-- ===============================================

-- Cupones activos disponibles
SELECT 
  coupon_id,
  code,
  discount_type,
  discount_value,
  max_discount_amount,
  min_order_amount,
  valid_from,
  valid_until,
  usage_limit,
  COALESCE(usage_limit - (SELECT COUNT(*) FROM order_items WHERE order_id IN 
    (SELECT order_id FROM orders WHERE discount_applied > 0)), usage_limit) AS remaining_usage
FROM coupons
WHERE is_active = TRUE
  AND valid_from <= NOW()
  AND valid_until >= NOW()
ORDER BY valid_until ASC;

-- Historial de uso de cupones
SELECT 
  c.code,
  c.discount_value,
  COUNT(o.order_id) AS times_used,
  SUM(o.discount_applied) AS total_discount_given
FROM coupons c
LEFT JOIN orders o ON o.coupon_code = c.code
WHERE c.code = 'PROECHO30'
GROUP BY c.coupon_id;

-- ===============================================
-- 7. UBICACIONES Y ENTREGAS
-- ===============================================

-- Órdenes en estado de entrega con información GPS
SELECT 
  o.order_id,
  o.order_number,
  u.first_name,
  u.phone,
  o.delivery_address,
  o.delivery_latitude,
  o.delivery_longitude,
  o.estimated_delivery_time,
  TIMESTAMPDIFF(MINUTE, NOW(), o.estimated_delivery_time) AS minutes_to_delivery
FROM orders o
JOIN users u ON o.user_id = u.user_id
WHERE o.status = 'on_delivery'
ORDER BY o.estimated_delivery_time ASC;

-- Ubicaciones guardadas del usuario
SELECT 
  location_id,
  label,
  address,
  latitude,
  longitude,
  is_primary
FROM saved_locations
WHERE user_id = 5
ORDER BY is_primary DESC, location_id ASC;

-- ===============================================
-- 8. NOTIFICACIONES
-- ===============================================

-- Notificaciones no leídas del usuario
SELECT 
  notification_id,
  type,
  title,
  message,
  related_order_id,
  created_at
FROM notifications
WHERE user_id = 5
  AND is_read = FALSE
ORDER BY created_at DESC;

-- Marcar notificación como leída
UPDATE notifications
SET is_read = TRUE
WHERE notification_id = 100;

-- Marcar todas las notificaciones como leídas
UPDATE notifications
SET is_read = TRUE
WHERE user_id = 5 AND is_read = FALSE;

-- ===============================================
-- 9. CARRITO DE COMPRAS
-- ===============================================

-- Obtener carrito actual del usuario
SELECT 
  c.cart_id,
  c.user_id,
  r.name AS restaurant_name,
  c.subtotal,
  c.tax,
  c.delivery_fee,
  c.discount,
  c.total,
  c.coupon_code
FROM carts c
JOIN restaurants r ON c.restaurant_id = r.restaurant_id
WHERE c.user_id = 5 AND c.restaurant_id = 1;

-- Items en el carrito
SELECT 
  ci.cart_item_id,
  p.name,
  p.image_url,
  ci.quantity,
  ci.unit_price,
  (ci.quantity * ci.unit_price) AS total_price,
  ci.special_requests
FROM cart_items ci
JOIN products p ON ci.product_id = p.product_id
WHERE ci.cart_id = 100;

-- ===============================================
-- 10. REPORTES Y KPI
-- ===============================================

-- KPI diarios
SELECT 
  DATE(o.created_at) AS date,
  COUNT(DISTINCT o.order_id) AS orders,
  SUM(o.total_amount) AS revenue,
  COUNT(DISTINCT o.user_id) AS active_users,
  AVG(o.total_amount) AS avg_order_value,
  COUNT(DISTINCT o.restaurant_id) AS active_restaurants
FROM orders o
WHERE o.status = 'delivered'
  AND o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY DATE(o.created_at)
ORDER BY date DESC;

-- Top 10 restaurantes por calificación
SELECT 
  r.restaurant_id,
  r.name,
  r.cuisine_type,
  r.average_rating,
  COUNT(rv.review_id) AS review_count,
  COUNT(o.order_id) AS total_orders
FROM restaurants r
LEFT JOIN reviews rv ON r.restaurant_id = rv.restaurant_id
LEFT JOIN orders o ON r.restaurant_id = o.restaurant_id AND o.status = 'delivered'
WHERE r.is_verified = TRUE
GROUP BY r.restaurant_id
ORDER BY r.average_rating DESC, review_count DESC
LIMIT 10;

-- ===============================================
-- 11. MANTENIMIENTO Y LIMPIEZA
-- ===============================================

-- Eliminar carritos vacíos más de 7 días
DELETE FROM carts
WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)
  AND cart_id NOT IN (
    SELECT DISTINCT cart_id FROM cart_items
  );

-- Actualizar estadísticas de usuario
UPDATE users u
SET total_orders = (SELECT COUNT(*) FROM orders WHERE user_id = u.user_id AND status = 'delivered'),
    total_spent = (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE user_id = u.user_id AND status = 'delivered')
WHERE user_id = 5;

-- Actualizar promedio de calificación del restaurante
UPDATE restaurants r
SET average_rating = (
  SELECT AVG(rating) FROM reviews WHERE restaurant_id = r.restaurant_id
),
total_reviews = (
  SELECT COUNT(*) FROM reviews WHERE restaurant_id = r.restaurant_id
)
WHERE restaurant_id = 1;

-- ===============================================
-- FIN DE EJEMPLOS DE CONSULTAS
-- ===============================================
