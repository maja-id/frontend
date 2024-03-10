import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type CardActionButton = {
  label?: string;
  primary?: boolean;
  onClick?: Function;
}

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input()
  className: string = '';
  @Input()
  closable: boolean = false;
  @Input()
  title: string = '';
  @Output()
  onClose: EventEmitter<any> = new EventEmitter();

  @Input()
  actions: CardActionButton[] = [];

  onClick(event: any) {
    if (this.closable) {
      this.onClose.emit(event);
    }
  }
}
