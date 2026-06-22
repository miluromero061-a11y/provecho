// ===============================================
// COMPONENTE: Carrito de Compras
// ===============================================

import React, { useState } from 'react';
import { colors, spacing, typography, borderRadius } from '../styles/theme';
import { CartItem } from '../models';

interface ShoppingCartProps {
  items: CartItem[];
  onRemoveItem?: (cartItemId: number) => void;
  onUpdateQuantity?: (cartItemId: number, quantity: number) => void;
  onCheckout?: () => void;
  onBack?: () => void;
}

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

  const subtotal = items.reduce((sum, item) => sum + (item.unit_price || 0) * item.quantity, 0);
  const tax = subtotal * 0.10;
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
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      alignItems: 'center' as const,
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
    },
    summarySection: {
      backgroundColor: colors.white,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      marginTop: spacing.lg,
      maxWidth: 400,
    },
    summaryTitle: {
      ...typography.h4,
      marginBottom: spacing.lg,
    },
    summaryRow: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      marginBottom: spacing.md,
      ...typography.body2,
    },
    summaryTotal: {
      display: 'flex' as const,
      justifyContent: 'space-between' as const,
      ...typography.h4,
      color: colors.primary,
      paddingTop: spacing.md,
      marginBottom: spacing.lg,
    },
    checkoutButton: {
      width: '100%',
      padding: spacing.lg,
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: borderRadius.md,
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: typography.button.fontSize,
    },
    emptyCart: {
      textAlign: 'center' as const,
      padding: spacing.xxl,
      color: colors.textSecondary,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>
          ← Volver
        </button>
        <h1 style={styles.headerTitle}>🛒 Tu Carrito</h1>
        <div style={{ width: 30 }} />
      </div>

      {items.length === 0 ? (
        <div style={styles.emptyCart}>
          <div style={typography.h3}>Tu carrito está vacío</div>
          <p style={typography.body2}>Agrega algunos platos deliciosos</p>
        </div>
      ) : (
        <div style={styles.content}>
          <div style={styles.summarySection}>
            <h3 style={styles.summaryTitle}>Resumen de compra</h3>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Impuesto (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Envío</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

            {couponDiscount > 0 && (
              <div style={styles.summaryRow}>
                <span>Descuento</span>
                <span style={{ color: colors.success }}>-${couponDiscount.toFixed(2)}</span>
              </div>
            )}

            <div style={styles.summaryTotal}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button style={styles.checkoutButton} onClick={onCheckout}>
              Proceder al pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
