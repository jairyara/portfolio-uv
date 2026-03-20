---
layout: ../../layouts/BlogPost.astro
title: "3 apps en Play Store, 150 USD/mes: lo que aprendí generando ingresos pasivos como dev"
description: "Cómo construí y moneticé tres aplicaciones Android con AdMob sin ser desarrollador móvil de carrera. Números reales, lecciones reales y lo que haría diferente hoy."
date: "2025-01-10"
tags: ["Android", "Ingresos Pasivos", "AdMob", "Indie Dev"]
readTime: "10 min"
---

Hace unos años publiqué mi primera app en Play Store casi como experimento. Hoy tengo tres apps activas que generan entre **150 y 200 USD mensuales** en ingresos pasivos con AdMob.

No es suficiente para vivir. Pero es suficiente para pagar el VPS, las suscripciones de trabajo y quedar con margen. Y lo mejor: no requiere mi atención activa.

Este artículo documenta el proceso, los números y las lecciones honestas.

## Las tres apps

### 1. Calculadora de Cuotas de Tarjeta

**Problema que resuelve:** En Colombia, los bancos ofrecen diferir compras en cuotas pero raramente muestran claramente cuánto pagas en total con intereses. Esta app calcula el costo real de diferir cualquier compra.

**Por qué funciona:** Es una herramienta utilitaria de búsqueda. La gente busca "calculadora cuotas tarjeta Colombia" en Play Store y aparece. Retención alta porque es útil.

**Ingresos:** ~70–90 USD/mes

### 2. GPS Offline Coordinates

**Problema que resuelve:** Topógrafos, interventores y trabajadores de campo necesitan coordenadas GPS precisas sin depender de internet. Esta app funciona 100% offline.

**Por qué funciona:** Nicho técnico con poca competencia. Los usuarios son profesionales que la recomiendan entre sí. Reviews sólidas.

**Ingresos:** ~40–60 USD/mes

### 3. WA Contact-Free Chat

**Problema que resuelve:** Abrir WhatsApp con un número sin necesidad de guardarlo en contactos. Útil para vendedores, freelancers, atención al cliente.

**Por qué funciona:** Caso de uso muy específico y frecuente. Búsquedas orgánicas consistentes.

**Ingresos:** ~30–50 USD/mes

## Cómo moneticé con AdMob

La integración es directa si usas Android nativo (Java/Kotlin). El flujo:

1. Crear cuenta en AdMob y enlazarla con Play Store
2. Crear unidades de anuncio para cada app (banner y/o interstitial)
3. Integrar el SDK en el proyecto
4. Colocar anuncios en puntos de bajo impacto en UX

El CPM en Colombia y Latinoamérica es bajo comparado con EEUU (entre $0.5 y $2 vs $5–15). Por eso el volumen importa. Mis apps tienen entre 2,000 y 8,000 usuarios activos mensuales combinados.

```
Fórmula rough:
Usuarios activos × sesiones/día × ads vistos × CPM / 1000 = ingresos
```

## Lo que haría diferente hoy

### Apuntar más al mercado en inglés desde el principio

Mis tres apps están en español. Si las hubiera lanzado en inglés (o bilingüe) desde el día uno, el CPM sería 3x–5x mayor con el mismo tráfico.

### Cobrar por la app o tener versión premium

Ad-only es el modelo más fácil de implementar pero el de menor margen. Una versión premium a $0.99 o $1.99 sin anuncios habría añadido ingresos con muy poco esfuerzo extra.

### Iterar más rápido en ASO

ASO (App Store Optimization) es el SEO de Play Store. El título, descripción, screenshots y palabras clave importan mucho. Lo aprendí tarde. Las primeras 3 semanas de una app son críticas para el ranking orgánico.

## La filosofía detrás

Prefiero lanzar rápido, medir, y si funciona mejorar. Si no funciona, no invertir más tiempo.

Estas tres apps las construí en fines de semana. Ninguna fue un proyecto de meses. El criterio era simple: ¿resuelve un problema real y específico? ¿Hay búsquedas orgánicas en Play Store? ¿Puedo construirlo en menos de dos semanas?

Si la respuesta es sí en las tres, vale la pena intentarlo.

---

¿Estás pensando en lanzar una app o quieres saber más sobre monetización con AdMob? [Escríbeme](/#contacto).
