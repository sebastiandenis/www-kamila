import { Component, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AnimateOnScroll } from 'primeng/animateonscroll';
import { Button } from 'primeng/button';

@Component({
	imports: [AnimateOnScroll, Button, TranslatePipe],
	selector: 'app-workshops-section',
	templateUrl: './workshops-section.component.html',
})
export class WorkshopsSectionComponent {
	readonly navigate = output<string>();
}