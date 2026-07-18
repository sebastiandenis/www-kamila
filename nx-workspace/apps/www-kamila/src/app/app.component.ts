import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  imports: [RouterModule, Button, Card, NgIconComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = signal('www-kamila');
}
