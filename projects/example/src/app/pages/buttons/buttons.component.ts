import { Component } from '@angular/core';
import { CardComponent, ButtonComponent } from '@maja.id/ui';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {}
