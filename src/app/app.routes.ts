import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./features/skills/skills.component').then((m) => m.SkillsComponent),
  },
  {
    path: 'projetos',
    loadComponent: () =>
      import('./features/projetos/projetos.component').then(
        (m) => m.ProjetosComponent
      ),
  },
  {
    path: 'roadmap',
    loadComponent: () =>
      import('./features/roadmap/roadmap.component').then((m) => m.RoadmapComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
