import { DOCUMENT } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, computed, inject, output, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { Button } from 'primeng/button';

interface GallerySlide {
  imageSrc: string;
  alt: string;
  title: string;
}

const TOTAL_GALLERY_IMAGES = 307;
const SELECTED_GALLERY_IMAGES = 20;

function buildGallerySlides(totalImages: number): GallerySlide[] {
  return Array.from({ length: totalImages }, (_, offset) => {
    const imageIndex = offset + 1;
    const imageName = `image${imageIndex.toString().padStart(2, '0')}.jpg`;
    const imagePath = `media/gallery/${imageName}`;

    return {
      imageSrc: imagePath,
      alt: `Interior wellbeing project ${imageIndex}`,
      title: `Project ${imageIndex}`,
    };
  });
}

export function selectRandomGallerySlides(
  slides: readonly GallerySlide[],
  count: number,
  randomValue: () => number = Math.random,
): GallerySlide[] {
  const shuffledSlides = [...slides];

  // Fisher-Yates guarantees a uniform random permutation before taking the first N items.
  for (let index = shuffledSlides.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(randomValue() * (index + 1));
    [shuffledSlides[index], shuffledSlides[randomIndex]] = [shuffledSlides[randomIndex], shuffledSlides[index]];
  }

  return shuffledSlides.slice(0, Math.min(count, shuffledSlides.length));
}

@Component({
  imports: [AnimateOnScroll, Button, TranslatePipe],
  selector: 'app-gallery-section',
  templateUrl: './gallery-section.component.html',
  styleUrl: './gallery-section.component.scss',
})
export class GallerySectionComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);

  readonly navigate = output<string>();

  readonly galleryHighlights = [
    'gallery.highlights.biophilic',
    'gallery.highlights.light',
    'gallery.highlights.materiality',
  ] as const;

  readonly galleryImages = signal<GallerySlide[]>([]);
  readonly activeIndex = signal(0);
  readonly transitionDirection = signal<'next' | 'prev'>('next');
  readonly isTransitioning = signal(false);
  readonly isLightboxOpen = signal(false);

  readonly currentSlide = computed(() => {
    const slides = this.galleryImages();

    if (slides.length === 0) {
      return null;
    }

    return slides[this.activeIndex()];
  });

  readonly previousSlide = computed(() => {
    const slides = this.galleryImages();

    if (slides.length === 0) {
      return null;
    }

    return slides[this.previousIndex()];
  });

  readonly nextSlide = computed(() => {
    const slides = this.galleryImages();

    if (slides.length === 0) {
      return null;
    }

    return slides[this.nextIndex()];
  });

  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private transitionTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    const allSlides = buildGallerySlides(TOTAL_GALLERY_IMAGES);
    this.galleryImages.set(selectRandomGallerySlides(allSlides, SELECTED_GALLERY_IMAGES));
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = '';
    this.stopAutoplay();
    this.clearTransitionTimer();
  }

  showNext(): void {
    this.switchTo('next');
  }

  showPrevious(): void {
    this.switchTo('prev');
  }

  openLightbox(): void {
    if (!this.currentSlide()) {
      return;
    }

    this.isLightboxOpen.set(true);
    this.pauseAutoplay();
    this.document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    if (!this.isLightboxOpen()) {
      return;
    }

    this.isLightboxOpen.set(false);
    this.document.body.style.overflow = '';
    this.resumeAutoplay();
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.isLightboxOpen()) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeLightbox();
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.showNext();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.showPrevious();
    }
  }

  pauseAutoplay(): void {
    this.stopAutoplay();
  }

  resumeAutoplay(): void {
    this.startAutoplay();
  }

  private switchTo(direction: 'next' | 'prev'): void {
    const slides = this.galleryImages();

    if (slides.length <= 1 || this.isTransitioning()) {
      return;
    }

    this.transitionDirection.set(direction);
    this.isTransitioning.set(true);

    if (direction === 'next') {
      this.activeIndex.set(this.nextIndex());
    } else {
      this.activeIndex.set(this.previousIndex());
    }

    this.clearTransitionTimer();
    this.transitionTimer = setTimeout(() => {
      this.isTransitioning.set(false);
      this.transitionTimer = null;
    }, 640);
  }

  private previousIndex(): number {
    const slidesCount = this.galleryImages().length;

    if (slidesCount === 0) {
      return 0;
    }

    return (this.activeIndex() - 1 + slidesCount) % slidesCount;
  }

  private nextIndex(): number {
    const slidesCount = this.galleryImages().length;

    if (slidesCount === 0) {
      return 0;
    }

    return (this.activeIndex() + 1) % slidesCount;
  }

  private startAutoplay(): void {
    if (this.autoplayTimer || this.galleryImages().length <= 1 || this.isLightboxOpen()) {
      return;
    }

    this.autoplayTimer = setInterval(() => {
      this.switchTo('next');
    }, 4600);
  }

  private stopAutoplay(): void {
    if (!this.autoplayTimer) {
      return;
    }

    clearInterval(this.autoplayTimer);
    this.autoplayTimer = null;
  }

  private clearTransitionTimer(): void {
    if (!this.transitionTimer) {
      return;
    }

    clearTimeout(this.transitionTimer);
    this.transitionTimer = null;
  }
}
