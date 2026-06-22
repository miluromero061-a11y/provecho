#!/bin/bash

# 🚀 Script de Deployment en Netlify - Proecho

echo "════════════════════════════════════════════════════════════"
echo "🍔 PROECHO - Aplicación de Delivery"
echo "════════════════════════════════════════════════════════════"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json no encontrado"
    echo "Ejecuta este script desde la raíz del proyecto"
    exit 1
fi

echo "✅ Verificando estado del proyecto..."
echo ""

# Verificar Git
echo "📦 Estado de Git:"
git status
echo ""

# Verificar Build
echo "🔨 Compilando aplicación..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Build exitoso!"
    echo "📁 Carpeta de deployment: ./build"
    echo ""
    echo "════════════════════════════════════════════════════════════"
    echo "🚀 Próximos pasos para Netlify:"
    echo "════════════════════════════════════════════════════════════"
    echo ""
    echo "1. Instalar Netlify CLI:"
    echo "   npm install -g netlify-cli"
    echo ""
    echo "2. Conectar a Netlify:"
    echo "   netlify login"
    echo ""
    echo "3. Deploy:"
    echo "   netlify deploy --prod --dir=build"
    echo ""
    echo "O simplemente:"
    echo "   1. Ve a https://app.netlify.com"
    echo "   2. Haz clic en 'New site from Git'"
    echo "   3. Selecciona tu repositorio GitHub"
    echo "   4. Netlify detectará automáticamente la configuración"
    echo ""
else
    echo ""
    echo "❌ Error en el build. Por favor revisa los errores arriba."
    exit 1
fi
