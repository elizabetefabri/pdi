# Componentes & Design System

## 🎨 Paleta de Cores (Corporate + Moderno)

Primária (Itaú): #0066CC (azul corporativo)
Secundária: #00CC66 (growth/evolução)
Neutra: #1F2937 (cinza escuro)
Accent: #FF6B35 (ousadia/destaque)

\`\`\`css
/* Tailwind config */
theme: {
  colors: {
    primary: '#0066CC',
    secondary: '#00CC66',
    accent: '#FF6B35',
    ...
  }
}
\`\`\`

## 📦 Componentes Necessários

### 1. **DashboardComponent** (Main view)
- KPI Cards (4-5 métricas principais)
- Evolution Chart (ECharts, linha/bar)
- Quick Stats

### 2. **SkillsComponent**
- Skill Cards com nível visual (stars/bars)
- Filter por categoria
- Animação ao scroll

### 3. **ProjectsComponent**
- Project Cards (grid responsivo)
- Modal com detalhes
- Filter por tech/ano

### 4. **RoadmapComponent**
- Timeline visual (2026-2028)
- Milestones por trimestre
- Conexão visual entre fases

### 5. **HeaderComponent**
- Navegação limpa
- Logo/nome destacado
- CTA para ação (ex: "Download PDF")

### 6. **FooterComponent**
- Links sociais (LinkedIn, GitHub)
- Contacto

---

## ❓ PERGUNTAS:

1. **Qual é sua paleta de cores preferida?**
   - Manter Itaú blue?
   - Adicionar cores próprias?
   
2. **Quer um componente de "sobre mim" inicial?**
   - Sua resposta: ___________

3. **Precisa de um modo "PDF export"?**
   - Para seu chefe imprimir/enviar
   - Sua resposta: ___________

---

## Resultado esperado
Um design system simples, coeso, que você consegue implementar em 5 dias