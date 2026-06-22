// ===============================================
// COMPONENTE: Catálogo de Productos
// ===============================================

import React, { useState } from 'react';
import { colors, spacing, typography, borderRadius, shadows, durations } from '../styles/theme';
import { Product } from '../models';

interface ProductCatalogProps {
  restaurantId: number;
  restaurantName: string;
  onProductSelect?: (product: Product, quantity: number) => void;
  onBack?: () => void;
}

/**
 * Componente que muestra el catálogo de productos de un restaurante
 */
const ProductCatalog: React.FC<ProductCatalogProps> = ({
  restaurantId,
  restaurantName,
  onProductSelect,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  // Mock de productos
  const mockProducts: Product[] = [
    // Hamburguesas
    {
      product_id: 1,
      restaurant_id: restaurantId,
      category_id: 1,
      name: 'Hamburguesa Clásica',
      description: 'Pan brioche, carne 150g, queso cheddar, lechuga, tomate y mayonesa',
      price: 9.99,
      image_url: '/images/burger-classic.jpg',
      is_active: true,
      preparation_time: 12,
      calories: 580,
      ingredients: ['Pan brioche', 'Carne 150g', 'Queso cheddar', 'Lechuga', 'Tomate'],
      allergens: ['Gluten', 'Lácteos'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      product_id: 2,
      restaurant_id: restaurantId,
      category_id: 1,
      name: 'Hamburguesa Premium',
      description: 'Pan brioche artesanal, carne 200g, queso azul, cebolla caramelizada',
      price: 14.99,
      image_url: '/images/burger-premium.jpg',
      is_active: true,
      preparation_time: 18,
      calories: 720,
      discount_percentage: 10,
      ingredients: ['Pan artesanal', 'Carne 200g', 'Queso azul', 'Cebolla caramelizada'],
      allergens: ['Gluten', 'Lácteos'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Pizzas
    {
      product_id: 3,
      restaurant_id: restaurantId,
      category_id: 2,
      name: 'Pizza Margarita',
      description: 'Mozzarella, tomate, albahaca fresca y aceite de oliva',
      price: 12.99,
      image_url: '/images/pizza-margherita.jpg',
      is_active: true,
      preparation_time: 15,
      calories: 450,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      product_id: 4,
      restaurant_id: restaurantId,
      category_id: 2,
      name: 'Pizza Pepperoni',
      description: 'Mozzarella, salsa de tomate, pepperoni y orégano',
      price: 13.99,
      image_url: '/images/pizza-pepperoni.jpg',
      is_active: true,
      preparation_time: 16,
      calories: 520,
      discount_percentage: 15,
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Sushi
    {
      product_id: 5,
      restaurant_id: restaurantId,
      category_id: 3,
      name: 'Rolls Philadelphia',
      description: 'Salmón fresco, queso crema, aguacate, pepino y arroz',
      price: 11.99,
      image_url: '/images/sushi-philadelphia.jpg',
      is_active: true,
      preparation_time: 10,
      calories: 280,
      created_at: new Date(),
      updated_at: new Date(),
    },
    // Bebidas
    {
      product_id: 6,
      restaurant_id: restaurantId,
      category_id: 6,
      name: 'Gaseosa 2L',
      description: 'Bebida carbonatada, variedad a elegir',
      price: 3.99,
      image_url: '/images/soda-2l.jpg',
      is_active: true,
      preparation_time: 1,
      calories: 200,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  const categories = [
    { id: 1, name: '🍔 Hamburguesas', icon: '🍔' },
    { id: 2, name: '🍕 Pizzas', icon: '🍕' },
    { id: 3, name: '🍱 Sushi', icon: '🍱' },
    { id: 4, name: '🍖 Parrilla', icon: '🍖' },
    { id: 5, name: '🍰 Postres', icon: '🍰' },
    { id: 6, name: '🥤 Bebidas', icon: '🥤' },
  ];

  const filteredProducts = selectedCategory
    ? mockProducts.filter(p => p.category_id === selectedCategory)
    : mockProducts;

  const handleQuantityChange = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.product_id] || 1;
    if (quantity > 0) {
      onProductSelect?.(product, quantity);
      setQuantities(prev => ({
        ...prev,
        [product.product_id]: 0,
      }));
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: colors.ultraLight,
    },
    header: {
      backgroundColor: colors.primary,
      color: colors.white,
      padding: spacing.lg,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      ...typography.h3,
      margin: 0,
      color: colors.white,
    },
    backButton: {
      background: 'transparent',
      border: 'none',
      color: colors.white,
      fontSize: 24,
      cursor: 'pointer',
    },
    categoriesContainer: {
      padding: spacing.md,
      display: 'flex',
      overflowX: 'auto' as const,
      gap: spacing.md,
      backgroundColor: colors.white,
      borderBottom: `1px solid ${colors.lightGray}`,
    },
    categoryButton: {
      padding: `${spacing.sm}px ${spacing.md}px`,
      borderRadius: borderRadius.full,
      border: `2px solid transparent`,
      backgroundColor: colors.ultraLight,
      cursor: 'pointer',
      whiteSpace: 'nowrap' as const,
      transition: `all ${durations.normal}ms`,
      fontSize: typography.body2.fontSize,
    },
    categoryButtonActive: {
      backgroundColor: colors.primary,
      color: colors.white,
      borderColor: colors.primary,
    },
    productsContainer: {
      padding: spacing.md,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: spacing.lg,
    },
    productCard: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      overflow: 'hidden' as const,
      boxShadow: shadows.md,
      transition: `transform ${durations.normal}ms`,
    },
    productImage: {
      width: '100%',
      height: '180px',
      backgroundColor: colors.lightGray,
      objectFit: 'cover' as const,
      position: 'relative' as const,
    },
    discountBadge: {
      position: 'absolute' as const,
      top: spacing.sm,
      right: spacing.sm,
      backgroundColor: colors.secondary,
      color: colors.black,
      padding: `${spacing.sm}px ${spacing.md}px`,
      borderRadius: borderRadius.md,
      fontWeight: '600',
      fontSize: typography.small.fontSize,
    },
    productInfo: {
      padding: spacing.md,
    },
    productName: {
      ...typography.h4,
      margin: '0 0 8px 0',
      color: colors.textPrimary,
    },
    productDescription: {
      ...typography.small,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
      minHeight: 40,
    },
    productFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.md,
    },
    productPrice: {
      ...typography.h4,
      color: colors.primary,
      margin: 0,
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,
      border: `1px solid ${colors.lightGray}`,
      borderRadius: borderRadius.md,
      padding: `${spacing.sm / 2}px`,
    },
    quantityButton: {
      background: 'transparent',
      border: 'none',
      width: 30,
      height: 30,
      cursor: 'pointer',
      fontSize: 18,
      color: colors.primary,
      borderRadius: borderRadius.sm,
      transition: `background ${durations.fast}ms`,
      '&:hover': {
        backgroundColor: colors.ultraLight,
      },
    },
    quantityDisplay: {
      minWidth: 30,
      textAlign: 'center' as const,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    addToCartButton: {
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      padding: `${spacing.sm}px ${spacing.md}px`,
      borderRadius: borderRadius.md,
      cursor: 'pointer',
      fontWeight: '600',
      transition: `all ${durations.normal}ms`,
      fontSize: typography.small.fontSize,
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Volver
        </button>
        <h1 style={styles.headerTitle}>{restaurantName}</h1>
        <div style={{ width: 30 }} /> {/* Spacer */}
      </div>

      {/* Categories */}
      <div style={styles.categoriesContainer}>
        <button
          style={{
            ...styles.categoryButton,
            ...(selectedCategory === null && styles.categoryButtonActive),
          }}
          onClick={() => setSelectedCategory(null)}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            style={{
              ...styles.categoryButton,
              ...(selectedCategory === category.id && styles.categoryButtonActive),
            }}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div style={styles.productsContainer}>
        {filteredProducts.map((product) => (
          <div key={product.product_id} style={styles.productCard}>
            <div style={{ position: 'relative' as const }}>
              <div style={styles.productImage}>
                <img
                  src={product.image_url || '/images/product-placeholder.jpg'}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              {product.discount_percentage && product.discount_percentage > 0 && (
                <div style={styles.discountBadge}>
                  -{product.discount_percentage}%
                </div>
              )}
            </div>

            <div style={styles.productInfo}>
              <div style={styles.productName}>{product.name}</div>
              <div style={styles.productDescription}>{product.description}</div>

              <div style={styles.productFooter}>
                <div style={styles.productPrice}>${product.price.toFixed(2)}</div>

                {(quantities[product.product_id] || 0) > 0 ? (
                  <div style={styles.quantityControl}>
                    <button
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(product.product_id, -1)}
                    >
                      −
                    </button>
                    <div style={styles.quantityDisplay}>
                      {quantities[product.product_id]}
                    </div>
                    <button
                      style={styles.quantityButton}
                      onClick={() => handleQuantityChange(product.product_id, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    style={styles.addToCartButton}
                    onClick={() => handleQuantityChange(product.product_id, 1)}
                  >
                    Agregar
                  </button>
                )}
              </div>

              {(quantities[product.product_id] || 0) > 0 && (
                <button
                  style={{
                    ...styles.addToCartButton,
                    width: '100%',
                    marginTop: spacing.sm,
                  }}
                  onClick={() => handleAddToCart(product)}
                >
                  Al carrito
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
