# 📋 PDI - Plano de Desenvolvimento Individual

Aplicação Angular 21 com Server-Side Rendering (SSR) para gerenciar planos de desenvolvimento individual.

## 🎯 Stack

- **Angular**: 21.2.0 (Standalone API + SSR)
- **Node**: 20.19.0 (via nvm)
- **Express**: 5.1.0 (SSR Server)
- **TypeScript**: ~5.9.2
- **SCSS**: Estilos componentizados
- **Taiga UI**: 5.4.0 (Design System - dependência instalada)
- **ECharts**: 6.0.0 + ngx-echarts 21.0.0 (Gráficos - dependência instalada)

**Nota**: Tailwind CSS foi removido. Usamos apenas CSS puro + SCSS + Taiga UI quando necessário.

---

## 🚀 Quick Start

### 1. Configurar Node (WSL/Bash)

```bash
# Se não tiver nvm instalado
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash

# Usar Node v20.19.0
nvm install 20.19.0
nvm use 20.19.0
node -v  # Verificar v20.19.0
```

### 2. Instalar Dependências

```bash
cd /home/elizabetefabri/repos/www/pdi
npm install
```

### 3. Rodar em Desenvolvimento

```bash
npm start
# Abre http://localhost:4200
```

### 4. Build para Produção

```bash
npm run build
# Gera: dist/pdi/browser + dist/pdi/server
```

### 5. Rodar Servidor SSR

```bash
npm run serve:ssr:pdi
# Acessa http://localhost:4000
```

---

## 📁 Estrutura do Projeto

```
pdi/
├── src/
│   ├── app/
│   │   ├── app.ts              # Root component
│   │   ├── app.config.ts       # App configuration
│   │   ├── app.routes.ts       # Client routes
│   │   ├── app.routes.server.ts # SSR routes
│   │   ├── app.config.server.ts # SSR config
│   │   └── app.scss            # Component styles
│   ├── main.ts                 # Browser bootstrap
│   ├── main.server.ts          # SSR bootstrap
│   ├── server.ts               # Express server
│   ├── styles.scss             # Global styles
│   └── index.html              # HTML template
├── dist/
│   └── pdi/
│       ├── browser/            # Build do navegador
│       └── server/             # Build do servidor
├── public/
│   └── favicon.ico
├── angular.json                # Angular config
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── .gitignore                  # Git ignore rules
```

---

## 🔧 Scripts Disponíveis

| Script                  | Descrição                                   |
| ----------------------- | ------------------------------------------- |
| `npm start`             | Serve app em http://localhost:4200          |
| `npm run build`         | Build para produção (SSR + browser)         |
| `npm run watch`         | Watch mode - rebuild on changes             |
| `npm test`              | Rodar testes (vitest)                       |
| `npm run serve:ssr:pdi` | Rodar servidor SSR em http://localhost:4000 |

---

## 📋 Verificação de Build

Após instalar, rode:

```bash
npm run build
```

**Resultado esperado:**

```
✔ Building...
Browser bundles
Initial chunk files  | Names            |  Raw size
...
Application bundle generation complete.
Output location: /home/elizabetefabri/repos/www/pdi/dist/pdi
```

---

## 🐛 Troubleshooting

### Erro: "Node.js version v18.20.8 detected"

Sempre use `nvm use 20.19.0` antes de rodar npm:

```bash
nvm use 20.19.0
npm run build
```

### Erro: "Cannot find module..."

Reinstale dependências:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Servidor SSR não inicia

Verifique se o build foi gerado:

```bash
ls -la dist/pdi/server/server.mjs
npm run build  # Se não existir
npm run serve:ssr:pdi
```

---

## 📚 Próximos Passos

1. Adicionar páginas em `src/app/features/`
2. Configurar serviços em `src/app/core/services/`
3. Criar componentes compartilhados em `src/app/shared/`
4. Implementar rotas em `src/app/app.routes.ts`
5. Adicionar testes com vitest

---

## 📦 Dependências Principais

- `@angular/*` - Framework core
- `@angular/ssr` - Server-side rendering
- `express` - HTTP server
- `@taiga-ui/*` - Design system components
- `ngx-echarts` - Chart library
- `rxjs` - Reactive programming

---

## ✅ Status do Projeto

- [x] Angular 21 setup com SSR
- [x] Taiga UI integrado
- [x] ECharts instalado
- [x] Hello World funcionando
- [x] Build completo
- [x] SSR server rodando
- [ ] Páginas e rotas
- [ ] Serviços e models
- [ ] Autenticação
- [ ] Deploy

---

**Created**: May 1, 2026
**Environment**: WSL Bash + Node v20.19.0
