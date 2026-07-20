import { Component, input, output } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Language, NavItem } from './app.models';

@Component({
	imports: [NgIconComponent, TranslatePipe],
	selector: 'app-site-header',
	templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
	readonly currentLanguage = input.required<Language>();
	readonly isMobileMenuOpen = input.required<boolean>();
	readonly soundtrackPlaying = input.required<boolean>();
	readonly desktopNavItems = input.required<NavItem[]>();
	readonly mobileNavItems = input.required<NavItem[]>();

	readonly languageSelected = output<Language>();
	readonly menuToggled = output<void>();
	readonly navigate = output<string>();
	readonly soundtrackToggled = output<void>();
}