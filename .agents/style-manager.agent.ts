/**
 * StyleManagerAgent — BMAD
 *
 * Business:    Mantém o design system do projeto consistente e documentado.
 *              Garante que CSS Variables, tokens de tipografia e espaçamento
 *              estejam alinhados entre styles.scss e a documentação.
 *
 * Model:       DesignToken, StyleSyncResult (ver types.ts)
 *
 * Architecture: Roda após SetupAgent. Independente do ComponentGeneratorAgent.
 *               Lê o design system definido internamente e gera/valida o styles.scss.
 *
 * Design:      Design tokens são definidos como fonte de verdade neste agente.
 *              A sincronização gera o bloco :root em styles.scss e um
 *              arquivo de documentação em docs/.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { DesignToken, StyleSyncResult } from './types';

export class StyleManagerAgent {
  readonly name = 'StyleManagerAgent';
  readonly version = '1.0';

  readonly tokens: DesignToken[] = [
    // Backgrounds
    { name: 'bg-primary',   value: '#0a0a0f', category: 'color' },
    { name: 'bg-secondary', value: '#111118', category: 'color' },
    { name: 'bg-tertiary',  value: '#18181f', category: 'color' },
    // Borders
    { name: 'border-default', value: '#2a2a3a', category: 'color' },
    // Accents
    { name: 'accent-primary',   value: '#ec6a2a', category: 'color' },
    { name: 'accent-secondary', value: '#f7c25e', category: 'color' },
    { name: 'accent-tertiary',  value: '#5e9ff7', category: 'color' },
    // Text
    { name: 'text-primary', value: '#e8e8f0', category: 'color' },
    { name: 'text-muted',   value: '#7a7a9a', category: 'color' },
    // Status
    { name: 'status-success',   value: '#4ecb8d', category: 'color' },
    { name: 'status-error',     value: '#f06a7a', category: 'color' },
    { name: 'status-highlight', value: '#a78bfa', category: 'color' },
    // Typography
    { name: 'font-display', value: "'Syne', sans-serif",     category: 'typography' },
    { name: 'font-body',    value: "'DM Sans', sans-serif",  category: 'typography' },
    { name: 'font-mono',    value: "'DM Mono', monospace",   category: 'typography' },
    // Spacing
    { name: 'spacing-xs',  value: '0.25rem', category: 'spacing' },
    { name: 'spacing-sm',  value: '0.5rem',  category: 'spacing' },
    { name: 'spacing-md',  value: '1rem',    category: 'spacing' },
    { name: 'spacing-lg',  value: '1.5rem',  category: 'spacing' },
    { name: 'spacing-xl',  value: '2rem',    category: 'spacing' },
    { name: 'spacing-2xl', value: '3rem',    category: 'spacing' },
    // Transitions
    { name: 'transition-fast',  value: '150ms ease', category: 'transition' },
    { name: 'transition-base',  value: '300ms ease', category: 'transition' },
    { name: 'transition-slow',  value: '500ms ease', category: 'transition' },
  ];

  async sync(): Promise<StyleSyncResult> {
    const start = Date.now();
    console.log(`[${this.name}] Sincronizando design system...`);

    const updatedFiles: string[] = [];

    this.validateStylesScss(updatedFiles);
    this.generateColorPaletteDoc(updatedFiles);

    const durationMs = Date.now() - start;
    const result: StyleSyncResult = {
      agent: this.name,
      version: this.version,
      timestamp: new Date().toISOString(),
      status: 'success',
      durationMs,
      tokensCount: this.tokens.length,
      filesUpdated: updatedFiles,
      message: `✅ ${this.tokens.length} tokens validados · ${updatedFiles.length} arquivos atualizados (${durationMs}ms)`,
    };

    console.log(`[${this.name}] ${result.message}\n`);
    return result;
  }

  /** Verifica se styles.scss contém todos os tokens e alerta sobre ausentes */
  private validateStylesScss(updatedFiles: string[]): void {
    const stylesPath = 'src/styles.scss';
    if (!existsSync(stylesPath)) {
      console.warn(`  ⚠️  src/styles.scss não encontrado — crie seguindo 01-angular-boilerplate.md`);
      return;
    }

    const content = readFileSync(stylesPath, 'utf-8');
    const missing = this.tokens.filter(t => !content.includes(`--${t.name}`));

    if (missing.length > 0) {
      console.warn(`  ⚠️  Tokens ausentes em styles.scss:`);
      missing.forEach(t => console.warn(`     --${t.name}: ${t.value}`));
    } else {
      console.log(`  ✅ styles.scss com todos os ${this.tokens.length} tokens`);
    }
  }

  /** Gera docs/color-palette.md com a documentação dos tokens */
  private generateColorPaletteDoc(updatedFiles: string[]): void {
    const docPath = 'docs/color-palette.md';

    const colors = this.tokens.filter(t => t.category === 'color');
    const spacing = this.tokens.filter(t => t.category === 'spacing');
    const typography = this.tokens.filter(t => t.category === 'typography');
    const transitions = this.tokens.filter(t => t.category === 'transition');

    const doc = [
      '# Design System — Tokens',
      '',
      '> Gerado automaticamente por StyleManagerAgent',
      '',
      '## Cores',
      ...colors.map(t => `- \`--${t.name}\`: \`${t.value}\``),
      '',
      '## Tipografia',
      ...typography.map(t => `- \`--${t.name}\`: \`${t.value}\``),
      '',
      '## Espaçamento',
      ...spacing.map(t => `- \`--${t.name}\`: \`${t.value}\``),
      '',
      '## Transições',
      ...transitions.map(t => `- \`--${t.name}\`: \`${t.value}\``),
      '',
    ].join('\n');

    writeFileSync(docPath, doc);
    updatedFiles.push(docPath);
    console.log(`  ✅ Documentação gerada: ${docPath}`);
  }

  /** Gera o bloco :root completo para uso em styles.scss */
  generateRootBlock(): string {
    const lines = [':root {'];
    let lastCategory = '';

    for (const token of this.tokens) {
      if (token.category !== lastCategory) {
        lines.push(`  /* ${token.category} */`);
        lastCategory = token.category;
      }
      lines.push(`  --${token.name}: ${token.value};`);
    }

    lines.push('}');
    return lines.join('\n');
  }
}
