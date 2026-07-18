import { Component, output } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { Button } from 'primeng/button';

@Component({
	imports: [AnimateOnScroll, Button, NgIconComponent, TranslatePipe],
	selector: 'app-hero-section',
	templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
	readonly navigate = output<string>();
}