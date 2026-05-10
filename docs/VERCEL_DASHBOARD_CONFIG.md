# 🎯 Configurar Vercel Dashboard - Passo a Passo

## ⚠️ PROBLEMA ANTERIOR

- ❌ Erro 500: `FUNCTION_INVOCATION_FAILED`
- ❌ Função serverless não conseguia achar o arquivo SSR

## ✅ SOLUÇÃO IMPLEMENTADA

- ✅ Simplificado `vercel.json` para auto-detecção
- ✅ `api/index.js` agora faz import dinâmico correto
- ✅ Build local testado e funcionando

---

## 📋 INSTRUÇÕES - Vercel Dashboard

### **1️⃣ Acessar Vercel Dashboard**

URL: https://vercel.com/dashboard

### **2️⃣ Selecionar seu projeto**

- Projeto ID: `prj_nKpZOXCniMF0mJmb3OdCNT01QfYl`
- Nome: PDI

### **3️⃣ Ir para Settings → Git**

```
Branch: main (ou develop, conforme sua estratégia)
Deploy on push: ✅ Habilitado
Preview Deployments: ✅ Habilitado
```

### **4️⃣ Ir para Settings → Build & Development**

#### **4.1 - Build Settings**

| Campo            | Valor           | Status                        |
| ---------------- | --------------- | ----------------------------- |
| Framework Preset | `Angular`       | ✅ Já detectado               |
| Build Command    | `npm run build` | ✅ Já configurado             |
| Output Directory | `dist/pdi`      | ⚠️ **IMPORTANTE: Verifique!** |
| Install Command  | `npm install`   | ✅ Padrão                     |
| Node.js Version  | `20.x`          | ✅ Compatível                 |

**Se o "Output Directory" estiver como `./dist/pdi`, MUDE PARA `dist/pdi`** (sem o ponto e barra)

#### **4.2 - Override Settings (se necessário)**

Se houver um warning de "Configuration Settings in the current Production deployment differ", clique em "Production Overrides" e atualize:

```
Build Command: npm run build
Framework: Angular
Output Directory: dist/pdi
Node.js Version: 20.x
```

---

## 📤 TRIGGERING NEW DEPLOY

Depois de fazer as configurações acima:

### **Opção 1: Redeploy automático**

```bash
git push origin main  # Já foi feito! ✅
```

Vercel vai detectar o novo commit e fazer deploy automaticamente.

### **Opção 2: Forçar redeploy (se necessário)**

1. Vá para **Deployments**
2. Clique nos "..." do último deploy
3. Selecione **"Redeploy"**
4. Confirme

---

## 🔍 MONITORAR O DEPLOY

1. **Vá para Deployments tab**
2. **Veja o status:**
   - 🟡 Em progresso
   - 🟢 Sucesso
   - 🔴 Erro

3. **Se der erro:**
   - Clique em **"Logs"**
   - Procure por mensagens de erro
   - Compartilhe o erro comigo

---

## ✅ O QUE VERCEL VAI FAZER

```
1. Detectar novo commit em main
2. Fazer clone do repositório
3. Executar: npm install
4. Executar: npm run build
   └─ Gera: dist/pdi/browser/ (assets estáticos)
   └─ Gera: dist/pdi/server/server.mjs (SSR)
5. Compilar: api/index.js (função serverless)
6. Deploy automático
```

---

## 🚀 TESTE APÓS O DEPLOY

Depois que o deploy terminar:

### **Testes esperados:**

```
✅ GET / → Redireciona para /dashboard
✅ GET /dashboard → HTML renderizado via SSR
✅ GET /skills → HTML renderizado via SSR
✅ GET /projetos → HTML renderizado via SSR
✅ GET /roadmap → HTML renderizado via SSR
```

### **Como testar:**

```bash
# Se tiver a URL do seu projeto:
curl -I https://seu-projeto.vercel.app/dashboard
# Esperado: HTTP/1.1 200 OK

curl -s https://seu-projeto.vercel.app/dashboard | head -20
# Esperado: HTML com <html><head>...<body>...</body></html>
```

---

## ⚠️ SE TIVER ERRO 500 AINDA

Se aparecer erro 500 novamente:

### **Verificar Logs:**

1. Vá para **Deployments** → Último deploy
2. Clique em **"Logs"**
3. Procure por:
   - `ENOENT` (arquivo não encontrado)
   - `Cannot find module` (módulo não encontrado)
   - `SyntaxError` (erro de sintaxe)

### **Debug local:**

```bash
# Simular build Vercel localmente
npm run build
npm run serve:ssr:pdi

# Testar em:
http://localhost:4000/dashboard
```

---

## 📁 ARQUIVOS CHAVE

### **Mudanças realizadas:**

- ✅ `api/index.js` - Handler serverless simples
- ✅ `vercel.json` - Configuração minimalista
- ✅ `package.json` - Scripts para build e serve

### **Gerados automaticamente pelo build:**

- `dist/pdi/browser/` - Assets estáticos
- `dist/pdi/server/server.mjs` - Express app com SSR

---

## 🎯 RESUMO FINAL

| Item              | Status                     |
| ----------------- | -------------------------- |
| Build local       | ✅ Funcionando             |
| SSR local         | ✅ Funcionando             |
| Commit no main    | ✅ Feito                   |
| Push para GitHub  | ✅ Feito                   |
| Vercel Dashboard  | ⏳ Aguardando configuração |
| Deploy automático | ⏳ Aguardando push Vercel  |

**PRÓXIMO PASSO:** Configure o Vercel Dashboard conforme as instruções acima, e o deploy será automático! 🚀
