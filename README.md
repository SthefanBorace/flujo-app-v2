# Flujo — Control Financiero Personal v2.0

App de control financiero con IA, tarjetas de crédito y proyecciones de interés.

## Requisitos
- Node.js 18 o superior
- Una API key de Anthropic

## Instalación local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar tu API key de Anthropic
# En Mac/Linux:
export ANTHROPIC_API_KEY=sk-ant-...

# En Windows (PowerShell):
$env:ANTHROPIC_API_KEY="sk-ant-..."

# 3. Correr la app
npm start
```

Abre http://localhost:3000 en tu navegador.

---

## Publicar en Railway (gratis, recomendado)

1. Crea una cuenta en https://railway.app
2. Conecta tu repositorio de GitHub con este proyecto
3. En Variables de entorno agrega: `ANTHROPIC_API_KEY = sk-ant-...`
4. Railway detecta Node.js automáticamente y despliega
5. Te da una URL pública tipo `flujo-app.up.railway.app`

---

## Publicar en Render (gratis)

1. Crea cuenta en https://render.com
2. New → Web Service → conecta tu repo
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Agrega variable de entorno: `ANTHROPIC_API_KEY`

---

## Publicar en Fly.io

```bash
npm install -g flyctl
fly auth login
fly launch
fly secrets set ANTHROPIC_API_KEY=sk-ant-...
fly deploy
```

---

## Estructura del proyecto

```
flujo-app/
├── server.js          # Backend Express + proxy Anthropic API
├── package.json
├── public/
│   └── index.html     # Frontend completo (single page app)
└── README.md
```

## Funcionalidades

- Dashboard con métricas en tiempo real
- Registro de ingresos y gastos con categorías
- Módulo de tarjetas de crédito:
  - Configuración de TEA, fecha de corte y pago
  - Proyección automática de deuda + interés al corte
  - Cálculo de pago mínimo
  - Registro de pagos
- Análisis IA con Claude (conversacional, con contexto de tus datos reales)
- Sección de automatización (Apple Pay Shortcuts, webhook)
- Datos guardados en localStorage del navegador
