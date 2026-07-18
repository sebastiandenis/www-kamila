import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerBrandFacebook,
  tablerBrandInstagram,
  tablerHome,
  tablerMail,
  tablerMapPin,
  tablerPalette,
  tablerPhone,
  tablerPhoto,
} from '@ng-icons/tabler-icons';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideIcons({
      tablerArrowRight,
      tablerBrandFacebook,
      tablerBrandInstagram,
      tablerHome,
      tablerMail,
      tablerMapPin,
      tablerPalette,
      tablerPhone,
      tablerPhoto,
    }),
  ],
};
