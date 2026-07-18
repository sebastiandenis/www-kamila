import { AfterViewInit, Component, DestroyRef, ElementRef, inject, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { NgIconComponent } from '@ng-icons/core';

type Language = 'pl' | 'en';

interface NavItem {
  labelKey: string;
  target: string;
}

interface SenseCard {
  titleKey: string;
  bodyKey: string;
  icon: string;
}

@Component({
  imports: [AnimateOnScroll, Button, Card, NgIconComponent, TranslatePipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly translate = inject(TranslateService);

  readonly currentLanguage = signal<Language>('pl');
  readonly isMobileMenuOpen = signal(false);

  readonly navItems: NavItem[] = [
    { labelKey: 'nav.home', target: 'home' },
    { labelKey: 'nav.philosophy', target: 'philosophy' },
    { labelKey: 'nav.senses', target: 'senses' },
    { labelKey: 'nav.about', target: 'about' },
    { labelKey: 'nav.workshops', target: 'workshops' },
    { labelKey: 'nav.contact', target: 'contact' },
  ];

  readonly senseCards: SenseCard[] = [
    {
      titleKey: 'senses.cards.greenery.title',
      bodyKey: 'senses.cards.greenery.body',
      icon: 'tablerPlant',
    },
    {
      titleKey: 'senses.cards.earth.title',
      bodyKey: 'senses.cards.earth.body',
      icon: 'tablerSparkles',
    },
    {
      titleKey: 'senses.cards.scent.title',
      bodyKey: 'senses.cards.scent.body',
      icon: 'tablerDroplet',
    },
    {
      titleKey: 'senses.cards.flow.title',
      bodyKey: 'senses.cards.flow.body',
      icon: 'tablerRipple',
    },
  ];

  constructor() {
    this.translate.use(this.currentLanguage());
  }

  ngAfterViewInit(): void {
    const revealAnimatedElementsAboveViewport = () => this.revealAnimatedElementsAboveViewport();

    requestAnimationFrame(revealAnimatedElementsAboveViewport);
    window.addEventListener('scroll', revealAnimatedElementsAboveViewport, { once: true, passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', revealAnimatedElementsAboveViewport));
  }

  private revealAnimatedElementsAboveViewport(): void {
    const animatedElements = this.host.nativeElement.querySelectorAll('.p-animateonscroll');

    for (const element of animatedElements) {
      const animatedElement = element as HTMLElement;

      if (animatedElement.getBoundingClientRect().bottom <= 0) {
        animatedElement.style.opacity = '';
      }
    }
  }

  switchLanguage(language: Language): void {
    this.currentLanguage.set(language);
    this.translate.use(language);
    this.isMobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  scrollTo(target: string): void {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.isMobileMenuOpen.set(false);
  }
}
