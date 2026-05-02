import { mergeApplicationConfig, ApplicationConfig, signal } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // matchMedia não existe no Node.js — fornece light mode estático para SSR
    { provide: TUI_DARK_MODE, useValue: signal(false) },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
