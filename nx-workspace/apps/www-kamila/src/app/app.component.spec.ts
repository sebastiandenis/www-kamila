import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { provideIcons } from '@ng-icons/core';
import { vi } from 'vitest';
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
  tablerVolume,
  tablerVolumeOff,
  tablerX,
} from '@ng-icons/tabler-icons';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let originalNavigatorLanguages: readonly string[] | undefined;
  let originalNavigatorLanguage: string;
  let originalAudio: typeof Audio;
  let originalVisibilityStateDescriptor: PropertyDescriptor | undefined;
  let visibilityState: DocumentVisibilityState;

  const createMockAudioElement = (): HTMLAudioElement => {
    const mockAudio = {
      loop: false,
      preload: 'none',
      volume: 1,
      paused: true,
      src: '',
      play: vi.fn(async function play(this: { paused: boolean }) {
        this.paused = false;
      }),
      pause: vi.fn(function pause(this: { paused: boolean }) {
        this.paused = true;
      }),
      load: vi.fn(),
    } as unknown as HTMLAudioElement;

    return mockAudio;
  };

  beforeEach(async () => {
    originalNavigatorLanguages = navigator.languages;
    originalNavigatorLanguage = navigator.language;
    originalAudio = window.Audio;
    originalVisibilityStateDescriptor = Object.getOwnPropertyDescriptor(
      document,
      'visibilityState',
    );

    visibilityState = 'visible';
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => visibilityState,
    });

    const audioConstructorMock = vi.fn(function AudioMock(this: unknown) {
      return createMockAudioElement();
    });

    Object.defineProperty(window, 'Audio', {
      configurable: true,
      value: audioConstructorMock as unknown as typeof Audio,
    });

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
          tablerVolume,
          tablerVolumeOff,
          tablerX,
        }),
      ],
    }).compileComponents();
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'languages', {
      configurable: true,
      value: originalNavigatorLanguages,
    });
    Object.defineProperty(navigator, 'language', {
      configurable: true,
      value: originalNavigatorLanguage,
    });
    Object.defineProperty(window, 'Audio', {
      configurable: true,
      value: originalAudio,
    });

    if (originalVisibilityStateDescriptor) {
      Object.defineProperty(
        document,
        'visibilityState',
        originalVisibilityStateDescriptor,
      );
    }

    window.history.replaceState({}, '', '/');
  });

  it('should prefer Polish when it appears first in navigator languages', () => {
    Object.defineProperty(navigator, 'languages', {
      configurable: true,
      value: ['pl-PL', 'en-US'],
    });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('pl');
  });

  it('should use English when it appears before Polish in navigator languages', () => {
    Object.defineProperty(navigator, 'languages', {
      configurable: true,
      value: ['de-DE', 'en-GB', 'pl-PL'],
    });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('en');
  });

  it('should default to English when neither Polish nor English are present', () => {
    Object.defineProperty(navigator, 'languages', {
      configurable: true,
      value: ['de-DE', 'fr-FR'],
    });

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('en');
  });

  it('should respect lang query param over navigator language', () => {
    Object.defineProperty(navigator, 'languages', {
      configurable: true,
      value: ['pl-PL', 'en-US'],
    });
    window.history.replaceState({}, '', '/?lang=en');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.currentLanguage()).toEqual('en');
  });

  it('should show gallery in both navigations and keep workshops only on mobile navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.desktopNavItems.map((item) => item.target)).toEqual([
      'home',
      'philosophy',
      'senses',
      'gallery',
      'about',
      'contact',
    ]);
    expect(app.mobileNavItems.map((item) => item.target)).toEqual([
      'home',
      'philosophy',
      'senses',
      'gallery',
      'about',
      'workshops',
      'contact',
    ]);
  });

  it('should pause soundtrack when document becomes hidden', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance as unknown as {
      ngAfterViewInit: () => void;
      soundtrack: HTMLAudioElement;
    };
    app.ngAfterViewInit();

    const soundtrack = app.soundtrack;
    const pauseSpy = soundtrack.pause as unknown as ReturnType<typeof vi.fn>;

    visibilityState = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));

    expect(pauseSpy).toHaveBeenCalledTimes(1);
  });

  it('should retry soundtrack playback when document becomes visible again', async () => {
    visibilityState = 'hidden';

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance as unknown as {
      ngAfterViewInit: () => void;
      soundtrack: HTMLAudioElement;
    };
    app.ngAfterViewInit();

    const soundtrack = app.soundtrack;
    const playSpy = soundtrack.play as unknown as ReturnType<typeof vi.fn>;

    expect(playSpy).not.toHaveBeenCalled();

    visibilityState = 'visible';
    document.dispatchEvent(new Event('visibilitychange'));
    await Promise.resolve();

    expect(playSpy).toHaveBeenCalledTimes(1);
  });

  it('should stop soundtrack when user toggles it from navbar control', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance as unknown as {
      ngAfterViewInit: () => void;
      toggleSoundtrack: () => void;
      soundtrack: HTMLAudioElement;
      isSoundtrackPlaying: () => boolean;
    };

    app.ngAfterViewInit();
    await Promise.resolve();

    const soundtrack = app.soundtrack;
    const pauseSpy = soundtrack.pause as unknown as ReturnType<typeof vi.fn>;

    expect(app.isSoundtrackPlaying()).toBe(true);

    app.toggleSoundtrack();

    expect(pauseSpy).toHaveBeenCalledTimes(1);
    expect(app.isSoundtrackPlaying()).toBe(false);
  });
});
