# Guía Google Search Console — xmaxairconditioner.com

Todo está preparado. Solo sigue estos pasos en orden. (≈ 15 min)

---

## ✅ Lo que YA está listo en el sitio
- `robots.txt` → permite indexar todo y apunta al sitemap
- `sitemap.xml` → lista tu página principal con hreflang EN/ES
- Etiqueta de verificación en `index.html` (falta pegar TU código)
- Datos estructurados HVAC (JSON-LD) → para rich results y SEO local

---

## PASO 1 — Crear la propiedad en Search Console
1. Entra a **https://search.google.com/search-console** con tu cuenta de Google.
2. Click en **"Agregar propiedad"**.
3. Elige el tipo **"Prefijo de URL"** y escribe:
   ```
   https://xmaxairconditioner.com/
   ```

---

## PASO 2 — Verificar que el sitio es tuyo (elige UN método)

### Opción A — Etiqueta HTML (la más fácil con este sitio) ⭐ RECOMENDADA
1. En Search Console elige el método **"Etiqueta HTML"**.
2. Te dará algo así:
   ```html
   <meta name="google-site-verification" content="aBc123XyZ...">
   ```
3. Copia SOLO el código de dentro de `content="..."` (ej. `aBc123XyZ...`).
4. Abre `index.html`, busca `PEGA_TU_CODIGO_AQUI` y reemplázalo por tu código.
5. Sube/despliega el sitio (Vercel) y pulsa **"Verificar"** en Search Console.

### Opción B — Archivo HTML
1. Elige el método **"Archivo HTML"**.
2. Google te dará un archivo tipo `google1a2b3c4d5e.html` para descargar.
3. Sube ese archivo a la raíz del proyecto (junto a `index.html`).
4. Despliega y pulsa **"Verificar"**.

### Opción C — Dominio (DNS) — la más completa
1. Elige el tipo **"Dominio"** al crear la propiedad.
2. Google te da un registro **TXT**.
3. Agrégalo en tu proveedor del dominio (donde compraste xmaxairconditioner.com).
4. Pulsa **"Verificar"** (puede tardar unas horas en propagar).

---

## PASO 3 — Enviar el sitemap
1. Dentro de Search Console, ve al menú izquierdo → **"Sitemaps"**.
2. En "Agregar un sitemap nuevo" escribe:
   ```
   sitemap.xml
   ```
3. Click en **"Enviar"**. Debe quedar como "Correcto".

---

## PASO 4 — Pedir indexación inmediata
1. Arriba, en la barra **"Inspección de URLs"**, pega:
   ```
   https://xmaxairconditioner.com/
   ```
2. Cuando cargue, pulsa **"Solicitar indexación"**.
3. Repite esto cada vez que hagas cambios importantes.

---

## PASO 5 (IMPORTANTE) — Google Maps / Negocio local
Search Console NO te pone en Google Maps. Para Maps necesitas el **Perfil de Empresa**:
1. Entra a **https://business.google.com**
2. Crea el negocio con datos EXACTOS:
   - Nombre: **XMAX Air Conditioner**
   - Teléfono: **713-835-0359**
   - Web: **https://xmaxairconditioner.com**
   - Categoría: **HVAC Contractor** (Contratista de calefacción y aire acondicionado)
3. Como no tienes local físico, marca **"Atiendo a clientes en su ubicación"** y define las zonas de Houston.
4. **Verifica** el negocio (Google manda código por video, teléfono o postal).
5. Sube fotos, horario 24/7 y **pide reseñas** → es el factor #1 para salir alto en Maps.

---

## PASO 6 — Bing (opcional, gratis y rápido)
- Entra a **https://www.bing.com/webmasters** y puedes **importar** todo desde Google Search Console en 1 click.

---

### Checklist final
- [ ] Propiedad creada en Search Console
- [ ] Código de verificación pegado en `index.html` y verificado
- [ ] `sitemap.xml` enviado
- [ ] Indexación solicitada
- [ ] Perfil de Empresa (Google Maps) creado y verificado
- [ ] Reseñas de clientes pedidas
