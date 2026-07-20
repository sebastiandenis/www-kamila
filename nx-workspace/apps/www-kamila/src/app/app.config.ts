import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerBrandFacebook,
  tablerBrandInstagram,
  tablerDroplet,
  tablerHome,
  tablerLanguage,
  tablerLeaf,
  tablerMail,
  tablerMapPin,
  tablerMenu2,
  tablerPalette,
  tablerPhone,
  tablerPhoto,
  tablerPlant,
  tablerRipple,
  tablerSparkles,
  tablerSunHigh,
  tablerVolume,
  tablerVolumeOff,
  tablerX,
} from '@ng-icons/tabler-icons';
import packageJson from '../../../../package.json';
import { appRoutes } from './app.routes';

const TRANSLATION_CACHE_BUSTER = packageJson.version ?? 'dev';

const KamilaLightPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f2f6f0',
      100: '#dfeadf',
      200: '#c1d3c5',
      300: '#9db9a4',
      400: '#7a9a83',
      500: '#5f8068',
      600: '#4c6854',
      700: '#3f5344',
      800: '#314037',
      900: '#253129',
      950: '#151d18',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#3f5344',
          contrastColor: '#faf9f6',
          hoverColor: '#314037',
          activeColor: '#253129',
        },
        highlight: {
          background: '#dfeadf',
          focusBackground: '#c1d3c5',
          color: '#253129',
          focusColor: '#151d18',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideTranslateService({
      lang: 'pl',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: `.json?v=${TRANSLATION_CACHE_BUSTER}`,
      }),
    }),
    providePrimeNG({
      theme: {
        preset: KamilaLightPreset,
        options: {
          darkModeSelector: false,
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
      tablerDroplet,
      tablerHome,
      tablerLanguage,
      tablerLeaf,
      tablerMail,
      tablerMapPin,
      tablerMenu2,
      tablerPalette,
      tablerPhone,
      tablerPhoto,
      tablerPlant,
      tablerRipple,
      tablerSparkles,
      tablerSunHigh,
      tablerVolume,
      tablerVolumeOff,
      tablerX,
    }),
  ],
};
