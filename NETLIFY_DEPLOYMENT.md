# 🚀 Guía de Deployment en Netlify - Proecho

## ✅ Estado de la Aplicación

- **Build Status**: ✅ Exitoso
- **Tamaño del Build**: 49.18 kB (gzip)
- **Ubicación del Build**: `/build`
- **Punto de Entrada**: `public/index.html`

---

## 📋 Pasos para Conectar a Netlify

### Opción 1: Deployment Automático (Recomendado)

#### Paso 1: Acceder a Netlify

1. Ve a [https://netlify.com](https://netlify.com)
2. Haz clic en "Sign Up" o "Log In"
3. Elige "GitHub" como proveedor

#### Paso 2: Conectar Repositorio GitHub

1. Haz clic en "New site from Git"
2. Selecciona "GitHub"
3. Busca el repositorio `provecho`
4. Haz clic en "Install" (si es la primera vez)
5. Autoriza a Netlify acceso a tu GitHub

#### Paso 3: Configurar Build Settings

Netlify debería detectar automáticamente estos valores:

```
Build command: npm run build
Publish directory: build
```

Si no los detecta, configura manualmente:

1. En "Build settings" ingresa:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Runtime**: Node.js 18.x (recomendado)

2. En "Environment" agrega variables (si las necesitas):
   ```
   REACT_APP_API_URL=https://tu-api.com
   REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxxxx
   ```

#### Paso 4: Deploy

1. Haz clic en "Deploy site"
2. Espera a que termine la compilación (2-3 minutos)
3. ¡Tu sitio estará en vivo! 🎉

---

### Opción 2: Deployment Manual

#### Paso 1: Build Localmente

```bash
npm run build
```

Esto genera la carpeta `build/` con todos los archivos optimizados.

#### Paso 2: Usar Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Iniciar sesión en Netlify
netlify login

# Deploy
netlify deploy --prod --dir=build
```

#### Paso 3: Verificar Deploy

Netlify te dará una URL como:
```
https://tu-proyecto-nombre.netlify.app
```

---

## 🔗 URL Pública de Netlify

Una vez desplegado, tu aplicación estará disponible en:

```
https://tu-proyecto-nombre.netlify.app
```

El nombre se genera automáticamente, pero puedes personalizarlo en:
- Netlify Dashboard → Site settings → Change site name

---

## 🔄 Actualizaciones Automáticas

Una vez conectado a GitHub:

1. Cualquier push a la rama `main` dispara un build automático
2. El sitio se actualiza automáticamente después de ~3 minutos
3. Puedes ver el historial de deploys en el dashboard

---

## 🔐 Variables de Entorno en Netlify

### Agregar Variables Secretas

1. Ve a Netlify Dashboard
2. Selecciona tu sitio
3. Ve a "Build & deploy" → "Environment"
4. Haz clic en "Edit variables"
5. Agrega tus variables:

```
REACT_APP_API_URL = https://api.proecho.com
REACT_APP_STRIPE_PUBLIC_KEY = pk_test_xxxxx
```

**Nota**: Estas variables NO se incluyen en el repositorio (están en `.env.example`)

---

## ✅ Verificación del Sitio

Después del deploy, verifica:

- [ ] El sitio carga correctamente
- [ ] Las imágenes se muestran
- [ ] Los colores naranja están presentes
- [ ] La pantalla de inicio es responsiva
- [ ] Sin errores en la consola del navegador

---

## 🆘 Solución de Problemas

### Build falla

**Problema**: Error `npm ERR!`

**Solución**:
1. Verifica que `package.json` es válido
2. Revisa `netlify.toml`
3. En Netlify, ve a "Deploys" y revisa los logs

### Sitio muestra errores

**Problema**: Página en blanco o errores

**Solución**:
1. Abre DevTools (F12)
2. Revisa la consola para errores
3. Verifica que las rutas sean correctas

### Las variables de entorno no funcionan

**Problema**: `REACT_APP_*` indefinido

**Solución**:
1. Variables deben empezar con `REACT_APP_`
2. Reconstruye el sitio después de agregar variables
3. Espera 5 minutos para que se actualicen

---

## 📊 Monitoreo del Sitio

Netlify proporciona:

- ✅ Estadísticas de visitantes
- ✅ Bandwith usado
- ✅ Histórico de deploys
- ✅ Alertas de errores
- ✅ Información de dominio

Accede desde: Dashboard → Analytics

---

## 🎯 Próximos Pasos

1. **Agregar un dominio personalizado**
   - Compra dominio en [Namecheap](https://namecheap.com) o similar
   - En Netlify: Site settings → Domain management → Add domain

2. **Agregar SSL/HTTPS**
   - Netlify lo hace automáticamente (Let's Encrypt)
   - Sin costo adicional

3. **Optimizaciones**
   - Habilitar compresión
   - Configurar cache headers
   - Agregar PWA manifest

---

## 📞 Soporte

- **Documentación Netlify**: [https://docs.netlify.com](https://docs.netlify.com)
- **Comunidad**: [https://community.netlify.com](https://community.netlify.com)
- **Status**: [https://www.netlify.com/status/](https://www.netlify.com/status/)

---

## 🚀 ¡Listo para Publicar!

Tu aplicación **Proecho** está lista para ser publicada en Netlify. 

**Siguiendo estos pasos tendrás una URL pública en cuestión de minutos.**

---

**Última actualización**: 22 de Junio, 2026  
**Versión**: 1.0.0
