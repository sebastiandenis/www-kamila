import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScroll } from 'primeng/animateonscroll';

@Component({
  imports: [AnimateOnScroll, TranslatePipe],
  selector: 'app-philosophy-section',
  templateUrl: './philosophy-section.component.html',
})
export class PhilosophySectionComponent {}
