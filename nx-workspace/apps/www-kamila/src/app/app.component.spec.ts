import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
  tablerBrandFacebook,
  tablerDroplet,
  tablerLanguage,
  tablerMail,
  tablerMenu2,
  tablerPhone,
  tablerPlant,
  tablerRipple,
  tablerSparkles,
  tablerSunHigh,
  tablerX,
} from '@ng-icons/tabler-icons';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let originalNavigatorLanguages: readonly string[] | undefined;
  let originalNavigatorLanguage: string;

  beforeEach(async () => {
    originalNavigatorLanguages = navigator.languages;
    originalNavigatorLanguage = navigator.language;

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideTranslateService({ lang: 'pl', fallbackLang: 'en' }),
        provideIcons({
          tablerArrowRight,
          tablerBrandFacebook,
          tablerDroplet,
          tablerLanguage,
          tablerMail,
          tablerMenu2,
          tablerPhone,
          tablerPlant,
          tablerRipple,
          tablerSparkles,
          tablerSunHigh,
          tablerX,
        }),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'languages', { configurable: true, value: originalNavigatorLanguages });
    Object.defineProperty(navigator, 'language', { configurable: true, value: originalNavigatorLanguage });
    window.history.replaceState({}, '', '/');
  });

  it('should prefer Polish when it appears first in navigator languages', () => {
    Object.defineProperty(navigator, 'languages', { configurable: true, value: ['pl-PL', 'en-US'] });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('pl');
  });

  it('should use English when it appears before Polish in navigator languages', () => {
    Object.defineProperty(navigator, 'languages', { configurable: true, value: ['de-DE', 'en-GB', 'pl-PL'] });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('en');
  });

  it('should default to English when neither Polish nor English are present', () => {
    Object.defineProperty(navigator, 'languages', { configurable: true, value: ['de-DE', 'fr-FR'] });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('en');
  });

  it('should respect lang query param over navigator language', () => {
    Object.defineProperty(navigator, 'languages', { configurable: true, value: ['pl-PL', 'en-US'] });
    window.history.replaceState({}, '', '/?lang=en');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('en');
  });

  it('should show gallery in both navigations and keep workshops only on mobile navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.desktopNavItems.map((item) => item.target)).toEqual(['home', 'philosophy', 'senses', 'gallery', 'about', 'contact']);
    expect(app.mobileNavItems.map((item) => item.target)).toEqual(['home', 'philosophy', 'senses', 'gallery', 'about', 'workshops', 'contact']);
  });
});
