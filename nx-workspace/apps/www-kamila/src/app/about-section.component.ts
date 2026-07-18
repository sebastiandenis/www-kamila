import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScroll } from 'primeng/animateonscroll';

@Component({
	imports: [AnimateOnScroll, NgIconComponent, TranslatePipe],
	selector: 'app-about-section',
	templateUrl: './about-section.component.html',
})
export class AboutSectionComponent {}