import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNgIconLoader, withCaching } from '@ng-icons/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideNgIconLoader((name: string) => {
      const http = inject(HttpClient);
      return http.get(`/assets/icons/${name}.svg`, {
        responseType: 'text'
      });
    }, withCaching()),
  ]
};
