---
layout: ../../layouts/BlogPost.astro
title: "Cómo desplegué mi portafolio en Cloudflare Pages con Astro (y qué aprendí)"
description: "Guía práctica para deployar un sitio Astro en Cloudflare Pages desde un repositorio de GitHub. Configuración de dominio personalizado con Namecheap y optimizaciones que marcan la diferencia."
date: "2024-12-02"
tags: ["Astro", "Cloudflare", "Deploy", "Frontend"]
readTime: "6 min"
---

Cloudflare Pages es, actualmente, una de las mejores opciones para deployar sitios estáticos. Gratis, rápido, con CDN global y sin configurar un servidor.

En este artículo documento exactamente cómo configuré mi portafolio en Astro para correr en Cloudflare Pages con dominio personalizado comprado en Namecheap.

## Por qué Astro + Cloudflare Pages

**Astro** genera HTML estático en build time. Cero JavaScript innecesario en el cliente. Resultados en Lighthouse por encima de 95 consistentemente.

**Cloudflare Pages** te da:
- Deploy automático desde GitHub push
- CDN global sin costo
- SSL automático
- Preview deploys por rama (para testear antes de subir a producción)

La combinación es potente y gratuita para proyectos personales.

## Paso 1: Preparar el proyecto Astro

Tu `astro.config.mjs` debe tener `output: 'static'` (que es el default):

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://tudominio.com',
});
```

Asegúrate de que el build funcione localmente:

```bash
npm run build
# Revisa la carpeta /dist - eso es lo que se va a deployar
```

## Paso 2: Conectar GitHub con Cloudflare Pages

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create
2. Selecciona **Pages** → Connect to Git
3. Autoriza GitHub y elige tu repositorio
4. Configuración de build:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click en **Save and Deploy**

El primer deploy tarda 1–2 minutos. Los siguientes son más rápidos porque Cloudflare cachea las dependencias.

## Paso 3: Dominio personalizado desde Namecheap

Tienes dos opciones:

### Opción A: Mover nameservers a Cloudflare (recomendado)

En Cloudflare, agrega tu dominio al plan Free. Te dará dos nameservers propios (algo como `ada.ns.cloudflare.com`).

En Namecheap → Domain List → Manage → Nameservers → selecciona "Custom DNS" y pega los nameservers de Cloudflare.

La propagación tarda entre 15 minutos y 48 horas (en la práctica, suele ser menos de 1 hora).

### Opción B: Registro CNAME directo

Si no quieres mover los nameservers, en Cloudflare Pages → Custom domains → agrega tu dominio. Cloudflare te dará un CNAME para pegar en Namecheap.

En Namecheap → Advanced DNS → agrega el CNAME record que te indicó Cloudflare.

**Recomiendo la Opción A.** Gestionar todo DNS desde Cloudflare es más cómodo y activa las protecciones DDoS automáticamente.

## Paso 4: Variables de entorno

Si tu sitio usa variables de entorno (para APIs, CMS, etc.), agrégalas en:

Cloudflare Pages → tu proyecto → Settings → Environment variables

Puedes tener variables distintas para `Production` y `Preview`.

## Errores comunes que tuve

**Build falla con "Cannot find module"**: Asegúrate de que todas las dependencias estén en `dependencies`, no en `devDependencies` si las necesitas en build time.

**Las rutas terminan en `/` en local pero no en producción**: Configura `trailingSlash: 'always'` o `'never'` en `astro.config.mjs` para que sea consistente.

**Imágenes no cargan**: El directorio `public/` se copia tal cual a `dist/`. Verifica que las rutas en tu código empiecen con `/`.

## Resultado

Deploy automático en cada `git push`. Preview deploy por cada Pull Request. Certificado SSL renovado automáticamente. Tiempo de respuesta bajo 50ms en Colombia gracias al PoP de Cloudflare en Bogotá.

El stack funciona. Y es gratis.
