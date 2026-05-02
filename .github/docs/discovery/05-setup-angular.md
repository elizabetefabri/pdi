# Setup Angular v17 para PDI

## Comandos para rodar

\`\`\`bash
# 1. Criar projeto com latest Angular
ng new pdi-frontend --standalone --routing --style=css

# 2. Instalar dependências principais
npm install recharts framer-motion tailwindcss @hookform/resolvers

# 3. Configurar Tailwind
ng add @tailwindcss/angular

# 4. Rodar
ng serve
\`\`\`

## Estrutura de pastas pronta
[Fornecerei script para gerar automaticamente]

## Git & Versionamento
- Criar repo GitHub: `pdi-frontend`
- Estrutura de branches: `main` | `develop` | `feature/*`
- Commits seguindo Conventional Commits

---

## ❓ QUESTÕES:

1. **Você quer hospedar onde?**
   - [ ] Vercel (recomendado para Angular)
   - [ ] GitHub Pages
   - [ ] AWS (S3 + CloudFront)
   - [ ] Outro: ___________

2. **Vai usar componentes UI prontos?**
   - [ ] Shadcn/ui
   - [ ] PrimeNG
   - [ ] Material (heavy, não recomendo)
   - [ ] Só Tailwind puro (lean, meu voto)

---

## Resultado esperado
Um projeto Angular v17 rodando localmente pronto para desenvolvimento