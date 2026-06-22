// ===============================================
// CONFIGURACIÓN DE ESTILOS Y COLORES - PROECHO
// ===============================================

/**
 * Paleta de colores de Proecho
 * Diseño moderno, minimalista y profesional
 */
export const colors = {
  // Color principal - Naranja vibrante
  primary: '#FF9500',           // Naranja vibrante principal
  primaryDark: '#E67E00',       // Naranja oscuro (hover)
  primaryLight: '#FFB84D',      // Naranja claro (estados)

  // Colores secundarios
  secondary: '#FFD700',         // Amarillo suave para promociones
  secondaryLight: '#FFE55C',    // Amarillo más claro
  
  // Neutros
  white: '#FFFFFF',             // Blanco puro
  black: '#1A1A1A',             // Negro oscuro
  darkGray: '#2D2D2D',          // Gris muy oscuro
  gray: '#4F4F4F',              // Gris medio
  lightGray: '#E8E8E8',         // Gris claro
  ultraLight: '#F5F5F5',        // Gris ultra claro (fondos)
  
  // Estados
  success: '#10B981',           // Verde éxito
  error: '#EF4444',             // Rojo error
  warning: '#F59E0B',           // Naranja advertencia
  info: '#3B82F6',              // Azul información
  
  // Textos
  textPrimary: '#1A1A1A',       // Texto principal
  textSecondary: '#4F4F4F',     // Texto secundario
  textTertiary: '#9CA3AF',      // Texto terciario
  textInverse: '#FFFFFF',       // Texto inverso
};

/**
 * Tipografía y tamaños de fuente
 */
export const typography = {
  // Títulos
  h1: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 1.2,
  },
  h2: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 1.3,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 1.3,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 1.4,
  },

  // Cuerpo
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.5,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 1.5,
  },

  // Pequeño
  small: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 1.4,
  },

  // Botones
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 1.4,
  },

  // Caption
  caption: {
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 1.4,
  },
};

/**
 * Espaciado y tamaños
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Bordes redondeados
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 999,
};

/**
 * Sombras
 */
export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
};

/**
 * Duraciones de animación
 */
export const durations = {
  fast: 150,
  normal: 300,
  slow: 500,
  verySlow: 800,
};

/**
 * Funciones de animación (easing)
 */
export const easing = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
};

/**
 * Breakpoints para diseño responsivo
 */
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

/**
 * Temas de aplicación
 */
export const themes = {
  light: {
    background: colors.white,
    surface: colors.ultraLight,
    text: colors.textPrimary,
    border: colors.lightGray,
    primary: colors.primary,
    error: colors.error,
  },
  dark: {
    background: colors.darkGray,
    surface: colors.black,
    text: colors.white,
    border: colors.gray,
    primary: colors.primary,
    error: colors.error,
  },
};

/**
 * Estilos de botones predefinidos
 */
export const buttonStyles = {
  primary: {
    background: colors.primary,
    color: colors.white,
    border: 'none',
    borderRadius: borderRadius.md,
    padding: `${spacing.md}px ${spacing.lg}px`,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    cursor: 'pointer',
    transition: `all ${durations.normal}ms ${easing.easeOut}`,
    '&:hover': {
      background: colors.primaryDark,
      boxShadow: shadows.md,
    },
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
  secondary: {
    background: colors.lightGray,
    color: colors.textPrimary,
    border: '1px solid ' + colors.lightGray,
    borderRadius: borderRadius.md,
    padding: `${spacing.md}px ${spacing.lg}px`,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    cursor: 'pointer',
    transition: `all ${durations.normal}ms ${easing.easeOut}`,
    '&:hover': {
      background: colors.gray,
      color: colors.white,
    },
  },
  outline: {
    background: 'transparent',
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
    borderRadius: borderRadius.md,
    padding: `${spacing.md - 2}px ${spacing.lg - 2}px`,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    cursor: 'pointer',
    transition: `all ${durations.normal}ms ${easing.easeOut}`,
    '&:hover': {
      background: colors.primary,
      color: colors.white,
    },
  },
};

/**
 * Capas de z-index
 */
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  durations,
  easing,
  breakpoints,
  themes,
  buttonStyles,
  zIndex,
};
