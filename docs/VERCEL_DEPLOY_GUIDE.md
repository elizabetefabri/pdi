# 📋 Guia de Deploy no Vercel - SSR com Angular 21 + Express

## ✅ O que foi ajustado localmente

### 1. **Erro SSRF (127.0.0.1:4200) - RESOLVIDO**

- ✅ Adicionado `allowedHosts` no `angular.json` (serve config)
- ✅ Agora aceita tanto `localhost:4200` quanto `127.0.0.1:4200`

### 2. **Configuração Vercel - PRONTA**

- ✅ Criado arquivo serverless: `api/[[...route]].ts`
- ✅ Instalado `@vercel/node` como devDependency
- ✅ Atualizado `vercel.json` com rewrites para SSR

---

## 🚀 Como fazer deploy no Vercel

### **Passo 1: Conectar repositório no Vercel**

1. Acesse https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**
3. Selecione seu repositório GitHub
4. Continue para as configurações

### **Passo 2: Configurar no Vercel Dashboard**

#### **Build & Development Settings**

```
Framework Preset: Angular
Build Command: npm run build
Output Directory: dist/pdi/browser (já configurado no vercel.json)
Install Command: npm install
```

#### **Environment Variables** (não são necessárias para SSR básico)

Se precisar, adicione:

- `NODE_ENV`: `production`

#### **Node.js Version**

Recomendado: **Node.js 20.x** (compatível com Angular 21)

### **Passo 3: Configurações Avançadas (se necessário)**

Na seção **"Project Settings"** → **"Git"**:

- Deploy on push: ✅ habilitado
- Preview Deployments: ✅ habilitado (recomendado)

---

## 📁 Arquivos criados/alterados

### ✅ `angular.json` (corrigido)

```json
"serve": {
  "builder": "@angular/build:dev-server",
  "options": {
    "allowedHosts": ["localhost", "127.0.0.1"]
  },
  ...
}
```

### ✅ `vercel.json` (atualizado)

```json
{
  "version": 2,
  "buildCommand": "npm install && npm run build",
  "outputDirectory": "dist/pdi/browser",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/api/[[...route]]"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### ✅ `api/[[...route]].ts` (novo)

Função serverless que intercepta todas as requisições e as roteia para o handler SSR do Angular.

### ✅ `package.json` (atualizado)

```bash
+ @vercel/node (devDependency instalado)
```

---

## 🧪 Testar localmente antes de fazer push

```bash
# Build production
npm run build

# Servir localmente (simular Vercel)
node dist/pdi/server/server.mjs
# Ou
npm run serve:ssr:pdi

# Acessar em: http://localhost:4000
```

---

## ⚠️ Possíveis erros no Vercel e soluções

| Erro                              | Solução                                                                 |
| --------------------------------- | ----------------------------------------------------------------------- |
| `Cannot find api/[[...route]].ts` | Certificar que o arquivo existe no root do projeto                      |
| `dist/pdi not found`              | Verifica se `npm run build` gera `dist/pdi/browser` e `dist/pdi/server` |
| `Port already in use`             | Vercel usa port definida na env `PORT` (default 3000)                   |
| `Module not found: @vercel/node`  | Rodou `npm install --save-dev @vercel/node`?                            |

---

## 🔍 Verificar deploy status

No Vercel Dashboard:

1. Vá para seu projeto
2. Clique na aba **"Deployments"**
3. Veja o status do último build
4. Clique em **"Logs"** para troubleshooting

---

## 💾 Próximos passos

1. **Fazer push** das mudanças para GitHub

   ```bash
   git add .
   git commit -m "feat: configure SSR for Vercel deployment"
   git push origin develop
   ```

2. **Monitorar o deploy** no Vercel Dashboard
   - Primeiro deploy pode levar 3-5 minutos
   - Verifique os logs se tiver erro

3. **Testar em produção**
   - Clique na URL do seu projeto no Vercel
   - Teste todas as rotas (/skills, /projetos, /roadmap, etc)

---

## 📚 Referências

- [Vercel Angular Deploy](https://vercel.com/docs/frameworks/angular)
- [Angular SSR Best Practices](https://angular.dev/guide/ssr)
- [Express.js on Vercel](https://vercel.com/docs/functions/serverless-functions)
