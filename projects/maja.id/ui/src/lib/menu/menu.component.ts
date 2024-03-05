import { NgClass } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MenuComponent {
  @Input()
  horizontal: boolean = false;

  @Input()
  border: boolean = false;

  get customClass(): string {
    let classes = '';
    if (this.horizontal) {
      classes += 'horizontal ';
    }
    if (this.border) {
      classes += 'bordered ';
    }
    return classes;
  }

}
