// ===============================================
// MODELOS DE DATOS - PROECHO
// ===============================================

/**
 * Interfaz para el registro de PRODUCTOS
 * 
 * Clave Primaria: product_id
 * Justificación: Identificador único, independiente del nombre,
 * garantiza unicidad y rendimiento en búsquedas
 */
export interface Product {
  product_id: number;           // PK - Identificador único
  restaurant_id: number;        // FK - Referencia al restaurante
  category_id: number;          // FK - Categoría del producto
  name: string;                 // Nombre único del producto
  description?: string;         // Descripción detallada
  price: number;                // Precio en moneda local
  image_url?: string;           // URL de la imagen
  is_active: boolean;           // Disponibilidad
  preparation_time: number;     // Minutos de preparación
  calories?: number;            // Información nutricional
  ingredients?: string[];       // Lista de ingredientes
  allergens?: string[];         // Alérgenos
  discount_percentage?: number; // Descuento si aplica
  created_at: Date;             // Fecha de creación
  updated_at: Date;             // Última actualización
}

/**
 * Interfaz para el registro de USUARIOS
 * 
 * Clave Primaria: user_id
 * Justificación: ID único garantiza independencia de credenciales,
 * evita conflictos si cambian email/teléfono, mejora seguridad
 */
export interface User {
  user_id: number;              // PK - Identificador único
  email: string;                // Email único para acceso
  phone: string;                // Teléfono único de contacto
  password_hash: string;        // Hash de contraseña (nunca texto plano)
  first_name: string;           // Nombre
  last_name: string;            // Apellido
  profile_image_url?: string;   // Foto de perfil
  date_of_birth?: Date;         // Fecha de nacimiento
  preferred_address?: string;   // Dirección preferida de entrega
  total_orders: number;         // Total de órdenes
  total_spent: number;          // Total gastado
  loyalty_points: number;       // Puntos de lealtad
  is_verified: boolean;         // Email verificado
  created_at: Date;             // Fecha de registro
  updated_at: Date;             // Última actualización
}

/**
 * Interfaz para el registro de ÓRDENES
 * 
 * Clave Primaria: order_id
 * Justificación: Cada orden es única, irreproducible y requiere
 * seguimiento GPS y auditoría de transacciones financieras
 */
export interface Order {
  order_id: number;                // PK - Identificador único
  user_id: number;                 // FK - Usuario que hace la orden
  restaurant_id: number;           // FK - Restaurante
  order_number: string;            // Número de seguimiento visible
  total_amount: number;            // Monto total
  subtotal: number;                // Subtotal
  tax_amount: number;              // Impuesto
  delivery_fee: number;            // Costo de envío
  discount_applied: number;        // Descuento
  status: OrderStatus;             // Estado de la orden
  payment_method: PaymentMethod;   // Método de pago
  delivery_address: string;        // Dirección de entrega
  delivery_latitude?: number;      // Coordenada GPS
  delivery_longitude?: number;     // Coordenada GPS
  estimated_delivery_time?: Date;  // ETA estimada
  actual_delivery_time?: Date;     // Hora real de entrega
  delivery_driver_id?: number;     // FK - ID del repartidor
  special_instructions?: string;   // Instrucciones especiales
  created_at: Date;                // Fecha de creación
  updated_at: Date;                // Última actualización
}

/**
 * Estados posibles de una orden
 */
export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'on_delivery' 
  | 'delivered' 
  | 'cancelled';

/**
 * Métodos de pago aceptados
 */
export type PaymentMethod = 
  | 'credit_card' 
  | 'debit_card' 
  | 'wallet' 
  | 'cash';

/**
 * Interfaz para el registro de RESTAURANTES
 * 
 * Clave Primaria: restaurant_id
 * Justificación: Identificador único independiente del nombre,
 * permite cambios administrativos sin perder integridad referencial
 */
export interface Restaurant {
  restaurant_id: number;           // PK - Identificador único
  name: string;                    // Nombre único
  owner_id: number;                // FK - Propietario
  description?: string;            // Descripción
  cuisine_type: string;            // Tipo de cocina
  logo_url?: string;               // Logo
  banner_image_url?: string;       // Banner
  address: string;                 // Dirección física
  latitude: number;                // Coordenada GPS
  longitude: number;               // Coordenada GPS
  phone: string;                   // Teléfono
  email: string;                   // Email
  average_rating: number;          // Calificación promedio (0-5)
  total_reviews: number;           // Total de reseñas
  delivery_time_minutes: number;   // Tiempo promedio de entrega
  minimum_order_amount: number;    // Monto mínimo
  delivery_radius_km: number;      // Radio de cobertura
  is_open: boolean;                // Estado operativo
  opening_time: string;            // Hora apertura (HH:MM)
  closing_time: string;            // Hora cierre (HH:MM)
  is_verified: boolean;            // Restaurante verificado
  total_orders: number;            // Total de órdenes
  created_at: Date;                // Fecha de registro
  updated_at: Date;                // Última actualización
}

/**
 * Interfaz para items dentro de una orden
 * (Relación muchos-a-muchos entre ORDERS y PRODUCTS)
 * 
 * Clave Primaria: order_item_id
 */
export interface OrderItem {
  order_item_id: number;           // PK - Identificador único
  order_id: number;                // FK - Referencia a orden
  product_id: number;              // FK - Referencia a producto
  quantity: number;                // Cantidad solicitada
  unit_price: number;              // Precio al momento de compra
  total_price: number;             // Subtotal (unit_price × quantity)
  special_requests?: string;       // Solicitudes especiales
  created_at: Date;                // Fecha de adición a carrito
}

/**
 * Interfaz para categorías de productos
 */
export interface Category {
  category_id: number;             // PK - Identificador único
  name: string;                    // Nombre (hamburguesas, pizzas, etc.)
  description?: string;            // Descripción
  icon_url?: string;               // Ícono de categoría
  color: string;                   // Color para UI (ej: #FF9500)
  is_active: boolean;              // Activo
  created_at: Date;
  updated_at: Date;
}

/**
 * Interfaz para reseñas y calificaciones
 */
export interface Review {
  review_id: number;               // PK - Identificador único
  order_id: number;                // FK - Referencia a orden
  user_id: number;                 // FK - Usuario que comenta
  restaurant_id: number;           // FK - Restaurante reseñado
  rating: number;                  // Calificación (1-5)
  title: string;                   // Título de la reseña
  comment: string;                 // Comentario
  is_verified_purchase: boolean;   // Compra verificada
  helpful_count: number;           // Votos útiles
  created_at: Date;
  updated_at: Date;
}

/**
 * Interfaz para cupones de descuento
 */
export interface Coupon {
  coupon_id: number;               // PK - Identificador único
  code: string;                    // Código único (ej: SUMMER2024)
  discount_type: 'percentage' | 'fixed';
  discount_value: number;          // Valor (% o monto)
  max_discount_amount?: number;    // Descuento máximo en efectivo
  min_order_amount: number;        // Orden mínima
  valid_from: Date;                // Válido desde
  valid_until: Date;               // Válido hasta
  usage_limit?: number;            // Usos totales permitidos
  usage_per_user?: number;         // Usos por usuario
  applicable_restaurants?: number[]; // IDs de restaurantes (null = todos)
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

/**
 * Interfaz para carrito de compras
 */
export interface Cart {
  cart_id: number;                 // PK - Identificador único
  user_id: number;                 // FK - Usuario propietario
  restaurant_id: number;           // FK - Restaurante seleccionado
  items: CartItem[];               // Items en el carrito
  subtotal: number;                // Subtotal
  tax: number;                     // Impuesto
  delivery_fee: number;            // Costo envío
  discount: number;                // Descuento aplicado
  total: number;                   // Total
  coupon_code?: string;            // Cupón aplicado
  created_at: Date;
  updated_at: Date;
}

/**
 * Item dentro del carrito
 */
export interface CartItem {
  cart_item_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  special_requests?: string;
}

/**
 * Interfaz para notificaciones
 */
export interface Notification {
  notification_id: number;         // PK - Identificador único
  user_id: number;                 // FK - Usuario destinatario
  type: NotificationType;          // Tipo de notificación
  title: string;                   // Título
  message: string;                 // Mensaje
  related_order_id?: number;       // Referencia a orden
  is_read: boolean;                // Leído
  created_at: Date;
}

export type NotificationType = 
  | 'order_confirmed' 
  | 'order_preparing' 
  | 'order_ready' 
  | 'order_on_delivery' 
  | 'order_delivered' 
  | 'promotional' 
  | 'system';

/**
 * Interfaz para ubicaciones guardadas del usuario
 */
export interface SavedLocation {
  location_id: number;             // PK - Identificador único
  user_id: number;                 // FK - Usuario propietario
  label: string;                   // Etiqueta (Casa, Trabajo, etc.)
  address: string;                 // Dirección completa
  latitude: number;                // Coordenada GPS
  longitude: number;               // Coordenada GPS
  is_primary: boolean;             // Ubicación por defecto
  created_at: Date;
  updated_at: Date;
}
