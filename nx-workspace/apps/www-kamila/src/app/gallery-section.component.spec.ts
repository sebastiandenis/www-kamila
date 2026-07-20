import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { GallerySectionComponent, selectRandomGallerySlides } from './gallery-section.component';

describe('GallerySectionComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: document }],
    });
  });

  it('should choose 15 randomized slides on init', () => {
    const component = TestBed.runInInjectionContext(() => new GallerySectionComponent());
    component.ngOnInit();

    const chosenSlides = component.galleryImages();
    expect(chosenSlides).toHaveLength(15);
    expect(new Set(chosenSlides.map((slide) => slide.imageSrc)).size).toBe(15);
  });

  it('should select unique slides up to requested count', () => {
    const slides = [
      { imageSrc: 'a.jpg', alt: 'a', title: 'a' },
      { imageSrc: 'b.jpg', alt: 'b', title: 'b' },
      { imageSrc: 'c.jpg', alt: 'c', title: 'c' },
      { imageSrc: 'd.jpg', alt: 'd', title: 'd' },
    ] as const;

    const randomSequence = [0.9, 0.4, 0.7, 0.1];
    let sequenceIndex = 0;
    const randomValue = () => {
      const value = randomSequence[sequenceIndex] ?? 0.5;
      sequenceIndex += 1;
      return value;
    };

    const selectedSlides = selectRandomGallerySlides(slides, 3, randomValue);

    expect(selectedSlides).toHaveLength(3);
    expect(new Set(selectedSlides.map((slide) => slide.imageSrc)).size).toBe(3);
  });
});
