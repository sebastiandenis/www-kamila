import { Component, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { Card } from 'primeng/card';
import { SenseCard } from './app.models';

@Component({
  imports: [AnimateOnScroll, Card, NgIconComponent, TranslatePipe],
  selector: 'app-senses-section',
  templateUrl: './senses-section.component.html',
})
export class SensesSectionComponent {
  readonly cards = input.required<SenseCard[]>();
}
