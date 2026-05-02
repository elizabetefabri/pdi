import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface AnchorLink {
  label: string;
  fragment: string;
}

interface DetailLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly professionalName = 'Elizabete Fabri';
  readonly currentRole = 'Engenheira de Plataforma';
  readonly squad = 'Squad Eng Foundation';
  readonly objectivePlaceholder = 'Objetivo do ciclo: __________________________________';

  readonly primaryLinks: AnchorLink[] = [
    { label: 'Diagnóstico', fragment: 'diagnostico' },
    { label: 'Fases', fragment: 'fases' },
    { label: 'Certificações', fragment: 'certificacoes' },
    { label: 'Entregas', fragment: 'entregas' },
    { label: 'Posicionamento', fragment: 'posicionamento' },
  ];

  readonly secondaryLinks: DetailLink[] = [
    { label: 'Skills', route: '/skills' },
    { label: 'Projetos', route: '/projetos' },
    { label: 'Roadmap', route: '/roadmap' },
  ];
}
