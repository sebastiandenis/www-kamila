import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { provideIcons } from '@ng-icons/core';
import {
  tablerArrowRight,
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideTranslateService({ lang: 'pl', fallbackLang: 'en' }),
        provideIcons({
          tablerArrowRight,
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

  it('should default to Polish translations', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('pl');
  });
});
