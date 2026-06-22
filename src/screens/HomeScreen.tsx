// ===============================================
// COMPONENTE: Pantalla de Inicio (HomeScreen)
// ===============================================

import React, { useState, useEffect } from 'react';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';
import { Restaurant, Product } from '../models';

interface HomeScreenProps {
  onRestaurantSelect?: (restaurant: Restaurant) => void;
  onProductSelect?: (product: Product) => void;
}

/**
 * Componente principal de la pantalla de inicio
 * Muestra promociones destacadas y catálogo de restaurantes
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onRestaurantSelect, 
  onProductSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Simular carga de datos
      // En producción, esto vendría de una API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockRestaurants: Restaurant[] = [
        {
          restaurant_id: 1,
          name: 'Burger Palace',
          owner_id: 101,
          cuisine_type: 'Fast Food',
          address: 'Calle Principal 123',
          latitude: 40.7128,
          longitude: -74.0060,
          phone: '+34 900 123 456',
          email: 'burger@palace.com',
          average_rating: 4.8,
          total_reviews: 245,
          delivery_time_minutes: 25,
          minimum_order_amount: 10,
          delivery_radius_km: 5,
          is_open: true,
          opening_time: '10:00',
          closing_time: '23:00',
          is_verified: true,
          total_orders: 5420,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          restaurant_id: 2,
          name: 'Pizza Vita',
          owner_id: 102,
          cuisine_type: 'Italiana',
          address: 'Plaza Mayor 456',
          latitude: 40.7190,
          longitude: -74.0050,
          phone: '+34 900 654 321',
          email: 'info@pizzavita.com',
          average_rating: 4.9,
          total_reviews: 312,
          delivery_time_minutes: 30,
          minimum_order_amount: 12,
          delivery_radius_km: 8,
          is_open: true,
          opening_time: '11:00',
          closing_time: '23:30',
          is_verified: true,
          total_orders: 6120,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const mockProducts: Product[] = [
        {
          product_id: 1,
          restaurant_id: 1,
          category_id: 1,
          name: 'Hamburguesa Premium',
          description: 'Carne 200g, queso, lechuga, tomate',
          price: 12.99,
          image_url: '/images/burger-premium.jpg',
          is_active: true,
          preparation_time: 15,
          calories: 650,
          discount_percentage: 15,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: 2,
          restaurant_id: 2,
          category_id: 2,
          name: 'Pizza Margarita',
          description: 'Tomate, mozzarella, orégano',
          price: 14.50,
          image_url: '/images/pizza-margherita.jpg',
          is_active: true,
          preparation_time: 20,
          calories: 550,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      setRestaurants(mockRestaurants);
      setFeaturedProducts(mockProducts);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 1, name: '🍔 Hamburguesas' },
    { id: 2, name: '🍕 Pizzas' },
    { id: 3, name: '🍱 Sushi' },
    { id: 4, name: '🍖 Parrilla' },
    { id: 5, name: '🍰 Postres' },
    { id: 6, name: '🥤 Bebidas' },
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: colors.ultraLight,
    },
    header: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: `${spacing.lg}px ${spacing.md}px`,
      marginBottom: spacing.lg,
    },
    headerTitle: {
      ...typography.h2,
      margin: '0 0 8px 0',
      color: colors.white,
    },
    tagline: {
      ...typography.body2,
      opacity: 0.9,
      color: colors.white,
    },
    searchContainer: {
      padding: `0 ${spacing.md}px ${spacing.lg}px`,
      marginBottom: spacing.lg,
    },
    searchInput: {
      width: '100%',
      padding: `${spacing.md}px ${spacing.md}px`,
      fontSize: typography.body2.fontSize,
      border: `1px solid ${colors.lightGray}`,
      borderRadius: borderRadius.md,
      backgroundColor: colors.white,
      boxShadow: shadows.sm,
    },
    promotionBanner: {
      backgroundColor: colors.secondary,
      margin: `${spacing.md}px ${spacing.md}px 0`,
      padding: spacing.lg,
      borderRadius: borderRadius.lg,
      color: colors.black,
      textAlign: 'center' as const,
    },
    promotionText: {
      ...typography.h3,
      marginBottom: spacing.sm,
    },
    categoriesContainer: {
      padding: spacing.md,
      marginBottom: spacing.lg,
      display: 'flex',
      overflowX: 'auto' as const,
      gap: spacing.md,
    },
    categoryChip: {
      padding: `${spacing.sm}px ${spacing.md}px`,
      borderRadius: borderRadius.full,
      border: `2px solid ${colors.primary}`,
      backgroundColor: colors.white,
      cursor: 'pointer',
      whiteSpace: 'nowrap' as const,
      transition: 'all 300ms ease-out',
    },
    categoryChipActive: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    sectionTitle: {
      ...typography.h3,
      padding: `0 ${spacing.md}px`,
      marginBottom: spacing.md,
      color: colors.textPrimary,
    },
    restaurantGrid: {
      padding: `0 ${spacing.md}px ${spacing.lg}px`,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: spacing.lg,
    },
    restaurantCard: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      overflow: 'hidden' as const,
      boxShadow: shadows.md,
      cursor: 'pointer',
      transition: 'transform 300ms ease-out',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
    },
    restaurantImage: {
      width: '100%',
      height: '200px',
      backgroundColor: colors.lightGray,
      objectFit: 'cover' as const,
    },
    restaurantInfo: {
      padding: spacing.md,
    },
    restaurantName: {
      ...typography.h4,
      marginBottom: spacing.sm,
      color: colors.textPrimary,
    },
    restaurantMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
      ...typography.small,
    },
    rating: {
      color: colors.primary,
      fontWeight: '600',
    },
    deliveryTime: {
      color: colors.textSecondary,
    },
    loadingSpinner: {
      textAlign: 'center' as const,
      padding: spacing.xxl,
      color: colors.textSecondary,
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>🍕 Proecho</h1>
        <p style={styles.tagline}>Tu comida favorita, más cerca que nunca</p>
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Buscar restaurantes o platos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Promotion Banner */}
      <div style={styles.promotionBanner}>
        <div style={styles.promotionText}>¡30% de descuento!</div>
        <p style={typography.body2}>En tu primer pedido con código: PROECHO30</p>
      </div>

      {/* Categories */}
      <div style={styles.categoriesContainer}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id.toString() ? null : category.id.toString())}
            style={{
              ...styles.categoryChip,
              ...(selectedCategory === category.id.toString() && styles.categoryChipActive),
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Restaurants */}
      <h2 style={styles.sectionTitle}>Restaurantes Destacados</h2>

      {loading ? (
        <div style={styles.loadingSpinner}>Cargando...</div>
      ) : (
        <div style={styles.restaurantGrid}>
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.restaurant_id}
              style={styles.restaurantCard}
              onClick={() => onRestaurantSelect?.(restaurant)}
            >
              <div style={styles.restaurantImage}>
                <img
                  src={restaurant.banner_image_url || '/images/restaurant-placeholder.jpg'}
                  alt={restaurant.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div style={styles.restaurantInfo}>
                <div style={styles.restaurantName}>{restaurant.name}</div>
                <div style={styles.restaurantMeta}>
                  <span style={styles.rating}>⭐ {restaurant.average_rating}</span>
                  <span style={styles.deliveryTime}>
                    🚗 {restaurant.delivery_time_minutes} min
                  </span>
                </div>
                <div style={typography.small}>{restaurant.cuisine_type}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
