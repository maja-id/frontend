import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [NgIf, NgClass,NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() customStyle: any = {};
  @Output() click = new EventEmitter();
  buttonType: string = '';

  constructor(private elRef: ElementRef) {
    console.log(this.elRef.nativeElement);
    if (this.elRef.nativeElement.hasAttribute('data-type')) {
      this.buttonType = this.elRef.nativeElement.getAttribute('data-type');
    }
  }

  onClick(event: any) {
    this.click.emit(event);
  }
}
