// ===============================================
// COMPONENTE: Carrito de Compras
// ===============================================

import React, { useState } from 'react';
import { colors, spacing, typography, borderRadius, shadows, buttonStyles } from '../styles/theme';
import { CartItem, Product } from '../models';

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem?: (cartItemId: number) => void;
  onUpdateQuantity?: (cartItemId: number, quantity: number) => void;
  onCheckout?: () => void;
  onBack?: () => void;
}

/**
 * Componente del carrito de compras
 */
const ShoppingCart: React.FC<ShoppingCartProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  onBack,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Mock de productos para obtener detalles
  const productDetails: { [key: number]: Product } = {
    1: {
      product_id: 1,
      restaurant_id: 1,
      category_id: 1,
      name: 'Hamburguesa Clásica',
      description: 'Pan brioche, carne 150g, queso cheddar',
      price: 9.99,
      is_active: true,
      preparation_time: 12,
      created_at: new Date(),
      updated_at: new Date(),
    },
    2: {
      product_id: 2,
      restaurant_id: 1,
      category_id: 1,
      name: 'Hamburguesa Premium',
      description: 'Pan brioche artesanal, carne 200g',
      price: 14.99,
      is_active: true,
      preparation_time: 18,
      discount_percentage: 10,
      created_at: new Date(),
      updated_at: new Date(),
    },
  };

  const subtotal = items.reduce((sum, item) => {
    const product = productDetails[item.product_id];
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const tax = subtotal * 0.10; // 10% tax
  const deliveryFee = 2.99;
  const total = subtotal + tax + deliveryFee - couponDiscount;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'PROECHO30') {
      const discount = subtotal * 0.30;
      setCouponDiscount(discount);
      setAppliedCoupon(couponCode);
      setCouponCode('');
    } else {
      alert('Cupón inválido');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
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
    content: {
      padding: spacing.lg,
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 350px',
      gap: spacing.lg,
    },
    itemsSection: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      boxShadow: shadows.md,
    },
    itemsTitle: {
      ...typography.h4,
      marginBottom: spacing.lg,
      borderBottomWidth: 2,
      borderBottomColor: colors.lightGray,
      paddingBottom: spacing.md,
    },
    cartItem: {
      display: 'flex',
      gap: spacing.md,
      padding: spacing.md,
      borderBottom: `1px solid ${colors.lightGray}`,
      alignItems: 'flex-start',
    },
    itemImage: {
      width: 100,
      height: 100,
      backgroundColor: colors.lightGray,
      borderRadius: borderRadius.md,
      objectFit: 'cover' as const,
    },
    itemDetails: {
      flex: 1,
    },
    itemName: {
      ...typography.body1,
      fontWeight: '600',
      marginBottom: space.sm,
      color: colors.textPrimary,
    },
    itemPrice: {
      ...typography.body2,
      color: colors.primary,
      fontWeight: '600',
      marginBottom: space.sm,
    },
    itemQuantityControl: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,
      border: `1px solid ${colors.lightGray}`,
      borderRadius: borderRadius.md,
      padding: `${spacing.sm / 2}px`,
      width: 'fit-content',
    },
    quantityButton: {
      background: 'transparent',
      border: 'none',
      width: 28,
      height: 28,
      cursor: 'pointer',
      fontSize: 16,
      color: colors.primary,
      borderRadius: borderRadius.sm,
    },
    removeButton: {
      background: 'transparent',
      border: 'none',
      color: colors.error,
      cursor: 'pointer',
      fontWeight: '600',
      marginTop: space.sm,
    },
    emptCart: {
      textAlign: 'center' as const,
      padding: spacing.xxl,
      color: colors.textSecondary,
    },
    summarySection: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      boxShadow: shadows.md,
      height: 'fit-content',
      position: 'sticky' as const,
      top: spacing.lg,
    },
    summaryTitle: {
      ...typography.h4,
      marginBottom: spacing.md,
      paddingBottom: space.md,
      borderBottom: `1px solid ${colors.lightGray}`,
    },
    summaryRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: space.md,
      ...typography.body2,
    },
    summaryTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      ...typography.h4,
      color: colors.primary,
      paddingTop: space.md,
      borderTop: `2px solid ${colors.lightGray}`,
      marginBottom: space.lg,
    },
    couponSection: {
      marginBottom: space.lg,
      paddingTop: space.md,
      borderTop: `1px solid ${colors.lightGray}`,
    },
    couponInput: {
      width: '100%',
      padding: `${space.sm}px`,
      border: `1px solid ${colors.lightGray}`,
      borderRadius: borderRadius.md,
      marginBottom: space.sm,
      fontSize: typography.body2.fontSize,
    },
    couponButton: {
      width: '100%',
      padding: `${space.sm}px`,
      backgroundColor: colors.secondary,
      color: colors.black,
      border: 'none',
      borderRadius: borderRadius.md,
      cursor: 'pointer',
      fontWeight: '600',
      marginBottom: space.md,
    },
    appliedCoupon: {
      backgroundColor: colors.secondary,
      padding: space.md,
      borderRadius: borderRadius.md,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: space.lg,
      ...typography.small,
    },
    checkoutButton: {
      width: '100%',
      padding: `${space.lg}px`,
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: borderRadius.md,
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: typography.button.fontSize,
      transition: 'all 300ms',
    },
  };

  // Fix typo in styles
  const space = spacing;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Volver
        </button>
        <h1 style={styles.headerTitle}>🛒 Tu Carrito</h1>
        <div style={{ width: 30 }} />
      </div>

      {items.length === 0 ? (
        <div style={styles.emptCart}>
          <div style={typography.h3}>Tu carrito está vacío</div>
          <p style={typography.body2}>Agrega algunos platos deliciosos</p>
        </div>
      ) : (
        <div style={styles.content}>
          {/* Items */}
          <div style={styles.itemsSection}>
            <h2 style={styles.itemsTitle}>Artículos ({items.length})</h2>
            {items.map((item) => {
              const product = productDetails[item.product_id];
              return (
                <div key={item.cart_item_id} style={styles.cartItem}>
                  <div style={styles.itemImage}>
                    <img
                      src={product?.image_url || '/images/product-placeholder.jpg'}
                      alt={product?.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: borderRadius.md,
                      }}
                    />
                  </div>

                  <div style={styles.itemDetails}>
                    <div style={styles.itemName}>{product?.name}</div>
                    <div style={styles.itemPrice}>
                      ${((product?.price || 0) * item.quantity).toFixed(2)}
                    </div>

                    <div style={styles.itemQuantityControl}>
                      <button
                        style={styles.quantityButton}
                        onClick={() =>
                          onUpdateQuantity?.(item.cart_item_id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <span style={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        style={styles.quantityButton}
                        onClick={() =>
                          onUpdateQuantity?.(item.cart_item_id, item.quantity + 1)\n                        }\n                      >\n                        +\n                      </button>\n                    </div>\n\n                    <button\n                      style={styles.removeButton}\n                      onClick={() => onRemoveItem?.(item.cart_item_id)}\n                    >\n                      Eliminar\n                    </button>\n                  </div>\n                </div>\n              );\n            })}\n          </div>\n\n          {/* Summary */}\n          <div style={styles.summarySection}>\n            <h3 style={styles.summaryTitle}>Resumen</h3>\n\n            <div style={styles.summaryRow}>\n              <span>Subtotal</span>\n              <span>${subtotal.toFixed(2)}</span>\n            </div>\n\n            <div style={styles.summaryRow}>\n              <span>Impuesto (10%)</span>\n              <span>${tax.toFixed(2)}</span>\n            </div>\n\n            <div style={styles.summaryRow}>\n              <span>Envío</span>\n              <span>${deliveryFee.toFixed(2)}</span>\n            </div>\n\n            {couponDiscount > 0 && (\n              <div style={styles.summaryRow}>\n                <span>Descuento</span>\n                <span style={{ color: colors.success }}>-${couponDiscount.toFixed(2)}</span>\n              </div>\n            )}\n\n            <div style={styles.summaryTotal}>\n              <span>Total</span>\n              <span>${total.toFixed(2)}</span>\n            </div>\n\n            {/* Coupon */}\n            <div style={styles.couponSection}>\n              {appliedCoupon ? (\n                <div style={styles.appliedCoupon}>\n                  <span>✓ {appliedCoupon.toUpperCase()}</span>\n                  <button\n                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}\n                    onClick={handleRemoveCoupon}\n                  >\n                    ✕\n                  </button>\n                </div>\n              ) : (\n                <>\n                  <input\n                    type=\"text\"\n                    placeholder=\"Código de cupón\"\n                    value={couponCode}\n                    onChange={(e) => setCouponCode(e.target.value)}\n                    style={styles.couponInput}\n                  />\n                  <button\n                    style={styles.couponButton}\n                    onClick={handleApplyCoupon}\n                    disabled={!couponCode}\n                  >\n                    Aplicar cupón\n                  </button>\n                </>\n              )}\n            </div>\n\n            <button\n              style={styles.checkoutButton}\n              onClick={onCheckout}\n            >\n              Proceder al pago\n            </button>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n};\n\nexport default ShoppingCart;\n