import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { AboutSectionComponent } from './about-section.component';
import { ContactSectionComponent } from './contact-section.component';
import { GallerySectionComponent } from './gallery-section.component';
import { HeroSectionComponent } from './hero-section.component';
import { Language, NavItem, SenseCard } from './app.models';
import { PhilosophySectionComponent } from './philosophy-section.component';
import { SensesSectionComponent } from './senses-section.component';
import { SiteHeaderComponent } from './site-header.component';
import { WorkshopsSectionComponent } from './workshops-section.component';

@Component({
  imports: [
    AboutSectionComponent,
    ContactSectionComponent,
    GallerySectionComponent,
    HeroSectionComponent,
    PhilosophySectionComponent,
    SensesSectionComponent,
    SiteHeaderComponent,
    WorkshopsSectionComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly translate = inject(TranslateService);
  private soundtrack: HTMLAudioElement | null = null;
  private isSoundtrackManuallyPaused = false;
  private removeSoundtrackActivationListeners: (() => void) | null = null;
  private removeSoundtrackVisibilityListeners: (() => void) | null = null;

  readonly currentLanguage = signal<Language>('pl');
  readonly isMobileMenuOpen = signal(false);
  readonly isSoundtrackPlaying = signal(false);

  readonly desktopNavItems: NavItem[] = [
    { labelKey: 'nav.home', target: 'home' },
    { labelKey: 'nav.philosophy', target: 'philosophy' },
    { labelKey: 'nav.senses', target: 'senses' },
    { labelKey: 'nav.gallery', target: 'gallery' },
    { labelKey: 'nav.about', target: 'about' },
    { labelKey: 'nav.contact', target: 'contact' },
  ];

  readonly mobileNavItems: NavItem[] = [
    { labelKey: 'nav.home', target: 'home' },
    { labelKey: 'nav.philosophy', target: 'philosophy' },
    { labelKey: 'nav.senses', target: 'senses' },
    { labelKey: 'nav.gallery', target: 'gallery' },
    { labelKey: 'nav.about', target: 'about' },
    { labelKey: 'nav.workshops', target: 'workshops' },
    { labelKey: 'nav.contact', target: 'contact' },
  ];

  readonly senseCards: SenseCard[] = [
    {
      titleKey: 'senses.cards.greenery.title',
      bodyKey: 'senses.cards.greenery.body',
      icon: 'tablerPlant',
      accent: '#7a9a83',
      glow: 'rgba(122, 154, 131, 0.22)',
      wash: 'rgba(122, 154, 131, 0.12)',
    },
    {
      titleKey: 'senses.cards.earth.title',
      bodyKey: 'senses.cards.earth.body',
      icon: 'tablerSparkles',
      accent: '#9b6a36',
      glow: 'rgba(155, 106, 54, 0.24)',
      wash: 'rgba(155, 106, 54, 0.13)',
    },
    {
      titleKey: 'senses.cards.scent.title',
      bodyKey: 'senses.cards.scent.body',
      icon: 'tablerDroplet',
      accent: '#b47a3a',
      glow: 'rgba(180, 122, 58, 0.24)',
      wash: 'rgba(180, 122, 58, 0.13)',
    },
    {
      titleKey: 'senses.cards.flow.title',
      bodyKey: 'senses.cards.flow.body',
      icon: 'tablerRipple',
      accent: '#4f6b59',
      glow: 'rgba(79, 107, 89, 0.22)',
      wash: 'rgba(79, 107, 89, 0.12)',
    },
  ];

  constructor() {
    const initialLanguage = this.resolveInitialLanguage();

    this.currentLanguage.set(initialLanguage);
    this.translate
      .use(initialLanguage)
      .pipe(take(1))
      .subscribe(() => {
        this.applySeo(initialLanguage);
      });
  }

  ngAfterViewInit(): void {
    const revealAnimatedElementsAboveViewport = () =>
      this.revealAnimatedElementsAboveViewport();

    requestAnimationFrame(revealAnimatedElementsAboveViewport);
    window.addEventListener('scroll', revealAnimatedElementsAboveViewport, {
      once: true,
      passive: true,
    });
    this.initializeSoundtrackPlayback();

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', revealAnimatedElementsAboveViewport);
      this.cleanupSoundtrackPlayback();
    });
  }

  private initializeSoundtrackPlayback(): void {
    const AudioConstructor = this.document.defaultView?.Audio;

    if (!AudioConstructor) {
      return;
    }

    this.soundtrack = new AudioConstructor('media/kd-soundtrack-64.mp3');
    this.soundtrack.loop = true;
    this.soundtrack.preload = 'auto';
    this.soundtrack.volume = 0.55;

    this.attachSoundtrackVisibilityListeners();
    void this.syncSoundtrackPlaybackToVisibility();
  }

  private attachSoundtrackVisibilityListeners(): void {
    const defaultView = this.document.defaultView;

    if (!defaultView || this.removeSoundtrackVisibilityListeners) {
      return;
    }

    const syncPlayback = () => {
      void this.syncSoundtrackPlaybackToVisibility();
    };

    this.document.addEventListener('visibilitychange', syncPlayback);
    defaultView.addEventListener('pageshow', syncPlayback);
    defaultView.addEventListener('pagehide', syncPlayback);

    this.removeSoundtrackVisibilityListeners = () => {
      this.document.removeEventListener('visibilitychange', syncPlayback);
      defaultView.removeEventListener('pageshow', syncPlayback);
      defaultView.removeEventListener('pagehide', syncPlayback);
      this.removeSoundtrackVisibilityListeners = null;
    };
  }

  private detachSoundtrackVisibilityListeners(): void {
    this.removeSoundtrackVisibilityListeners?.();
  }

  private async syncSoundtrackPlaybackToVisibility(): Promise<void> {
    if (!this.soundtrack) {
      return;
    }

    if (this.document.visibilityState === 'hidden') {
      this.soundtrack.pause();
      this.isSoundtrackPlaying.set(false);
      return;
    }

    if (this.soundtrack.paused && !this.isSoundtrackManuallyPaused) {
      await this.tryPlaySoundtrack();
    }
  }

  private async tryPlaySoundtrack(): Promise<void> {
    if (!this.soundtrack || this.isSoundtrackManuallyPaused) {
      return;
    }

    try {
      await this.soundtrack.play();
      this.isSoundtrackPlaying.set(true);
      this.detachSoundtrackActivationListeners();
    } catch {
      this.isSoundtrackPlaying.set(false);
      this.attachSoundtrackActivationListeners();
    }
  }

  toggleSoundtrack(): void {
    if (!this.soundtrack) {
      return;
    }

    if (!this.soundtrack.paused) {
      this.isSoundtrackManuallyPaused = true;
      this.soundtrack.pause();
      this.isSoundtrackPlaying.set(false);
      this.detachSoundtrackActivationListeners();
      return;
    }

    this.isSoundtrackManuallyPaused = false;
    void this.tryPlaySoundtrack();
  }

  private attachSoundtrackActivationListeners(): void {
    const defaultView = this.document.defaultView;

    if (!defaultView || this.removeSoundtrackActivationListeners) {
      return;
    }

    const retryPlayback = () => {
      void this.tryPlaySoundtrack();
    };

    defaultView.addEventListener('pointerdown', retryPlayback);
    defaultView.addEventListener('keydown', retryPlayback);
    defaultView.addEventListener('touchstart', retryPlayback, {
      passive: true,
    });

    this.removeSoundtrackActivationListeners = () => {
      defaultView.removeEventListener('pointerdown', retryPlayback);
      defaultView.removeEventListener('keydown', retryPlayback);
      defaultView.removeEventListener('touchstart', retryPlayback);
      this.removeSoundtrackActivationListeners = null;
    };
  }

  private detachSoundtrackActivationListeners(): void {
    this.removeSoundtrackActivationListeners?.();
  }

  private cleanupSoundtrackPlayback(): void {
    this.detachSoundtrackVisibilityListeners();
    this.detachSoundtrackActivationListeners();
    this.isSoundtrackPlaying.set(false);
    this.isSoundtrackManuallyPaused = false;

    if (!this.soundtrack) {
      return;
    }

    this.soundtrack.pause();
    this.soundtrack.src = '';
    this.soundtrack.load();
    this.soundtrack = null;
  }

  private revealAnimatedElementsAboveViewport(): void {
    const animatedElements =
      this.host.nativeElement.querySelectorAll('.p-animateonscroll');

    for (const element of animatedElements) {
      const animatedElement = element as HTMLElement;

      if (animatedElement.getBoundingClientRect().bottom <= 0) {
        animatedElement.style.opacity = '';
      }
    }
  }

  switchLanguage(language: Language): void {
    if (language === this.currentLanguage()) {
      this.isMobileMenuOpen.set(false);
      return;
    }

    this.currentLanguage.set(language);
    this.translate
      .use(language)
      .pipe(take(1))
      .subscribe(() => {
        this.applySeo(language);
      });
    this.isMobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  scrollTo(target: string): void {
    document
      .getElementById(target)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.isMobileMenuOpen.set(false);
  }

  private resolveInitialLanguage(): Language {
    const searchParams = new URLSearchParams(
      this.document.location?.search ?? '',
    );
    const languageFromQuery = this.asLanguage(searchParams.get('lang'));

    if (languageFromQuery) {
      return languageFromQuery;
    }

    const navigatorLanguages =
      this.document.defaultView?.navigator.languages ?? [];
    const languageCandidates =
      navigatorLanguages.length > 0
        ? navigatorLanguages
        : [this.document.defaultView?.navigator.language ?? ''];

    const firstSupportedLanguage = languageCandidates
      .map((language) => language.toLowerCase())
      .find(
        (language) => language.startsWith('pl') || language.startsWith('en'),
      );

    if (!firstSupportedLanguage) {
      return 'en';
    }

    return firstSupportedLanguage.startsWith('pl') ? 'pl' : 'en';
  }

  private asLanguage(candidate: string | null): Language | null {
    if (candidate === 'pl' || candidate === 'en') {
      return candidate;
    }

    return null;
  }

  private applySeo(language: Language): void {
    this.document.documentElement.setAttribute('lang', language);
    this.updateLanguageQueryParam(language);

    this.translate
      .get([
        'seo.title',
        'seo.description',
        'seo.keywords',
        'seo.siteName',
        'seo.structuredDataDescription',
        'seo.socialImageAlt',
      ])
      .pipe(take(1))
      .subscribe((seo) => {
        const canonicalUrl = this.getLanguageUrl(language);
        const alternateLanguage: Language = language === 'pl' ? 'en' : 'pl';
        const socialImageUrl = this.getSocialImageUrl();

        this.title.setTitle(seo['seo.title']);
        this.meta.updateTag({
          name: 'description',
          content: seo['seo.description'],
        });
        this.meta.updateTag({ name: 'keywords', content: seo['seo.keywords'] });
        this.meta.updateTag({ name: 'language', content: language });
        this.meta.updateTag({ property: 'og:type', content: 'website' });
        this.meta.updateTag({
          property: 'og:title',
          content: seo['seo.title'],
        });
        this.meta.updateTag({
          property: 'og:description',
          content: seo['seo.description'],
        });
        this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
        this.meta.updateTag({
          property: 'og:site_name',
          content: seo['seo.siteName'],
        });
        this.meta.updateTag({
          property: 'og:locale',
          content: language === 'pl' ? 'pl_PL' : 'en_US',
        });
        this.meta.updateTag({
          property: 'og:locale:alternate',
          content: alternateLanguage === 'pl' ? 'pl_PL' : 'en_US',
        });
        this.meta.updateTag({ property: 'og:image', content: socialImageUrl });
        this.meta.updateTag({
          property: 'og:image:type',
          content: 'image/jpeg',
        });
        this.meta.updateTag({ property: 'og:image:width', content: '1210' });
        this.meta.updateTag({ property: 'og:image:height', content: '638' });
        this.meta.updateTag({
          property: 'og:image:alt',
          content: seo['seo.socialImageAlt'],
        });
        this.meta.updateTag({
          name: 'twitter:card',
          content: 'summary_large_image',
        });
        this.meta.updateTag({
          name: 'twitter:title',
          content: seo['seo.title'],
        });
        this.meta.updateTag({
          name: 'twitter:description',
          content: seo['seo.description'],
        });
        this.meta.updateTag({ name: 'twitter:image', content: socialImageUrl });
        this.meta.updateTag({
          name: 'twitter:image:alt',
          content: seo['seo.socialImageAlt'],
        });

        this.updateLinkTag('canonical', canonicalUrl);
        this.updateLinkTag('alternate', this.getLanguageUrl('pl'), 'pl');
        this.updateLinkTag('alternate', this.getLanguageUrl('en'), 'en');
        this.updateLinkTag('alternate', this.getLanguageUrl('pl'), 'x-default');

        this.updateStructuredData(
          language,
          seo['seo.structuredDataDescription'],
        );
      });
  }

  private updateLanguageQueryParam(language: Language): void {
    const location = this.document.location;

    if (!location || !this.document.defaultView) {
      return;
    }

    const url = new URL(location.href);

    url.searchParams.set('lang', language);

    this.document.defaultView.history.replaceState(
      {},
      '',
      `${url.pathname}?${url.searchParams.toString()}${url.hash}`,
    );
  }

  private getLanguageUrl(language: Language): string {
    const location = this.document.location;

    if (!location) {
      return `/?lang=${language}`;
    }

    return `${location.origin}${location.pathname}?lang=${language}`;
  }

  private getSocialImageUrl(): string {
    const location = this.document.location;

    if (!location) {
      return '/media/me3.jpg';
    }

    return `${location.origin}/media/me3.jpg`;
  }

  private updateLinkTag(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    let element = this.document.head.querySelector(
      selector,
    ) as HTMLLinkElement | null;

    if (!element) {
      element = this.document.createElement('link');
      element.setAttribute('rel', rel);

      if (hreflang) {
        element.setAttribute('hreflang', hreflang);
      }

      this.document.head.appendChild(element);
    }

    element.setAttribute('href', href);
  }

  private updateStructuredData(language: Language, description: string): void {
    let scriptElement = this.document.head.querySelector(
      '#kamila-seo-schema',
    ) as HTMLScriptElement | null;

    if (!scriptElement) {
      scriptElement = this.document.createElement('script');
      scriptElement.id = 'kamila-seo-schema';
      scriptElement.type = 'application/ld+json';
      this.document.head.appendChild(scriptElement);
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Kamila Denis',
      serviceType:
        language === 'pl'
          ? 'Architektura wnętrz dobrostanu'
          : 'Wellbeing interior architecture',
      description,
      image: this.getSocialImageUrl(),
      logo: this.getSocialImageUrl(),
      areaServed: language === 'pl' ? 'Polska' : 'Poland',
      availableLanguage: ['pl', 'en'],
      telephone: '+48 664 726 723',
      email: 'kamila.denis@outlook.com',
      sameAs: ['https://www.facebook.com/kamiladenisarchitektwnetrz'],
      url: this.getLanguageUrl(language),
    };

    scriptElement.textContent = JSON.stringify(schema);
  }
}
