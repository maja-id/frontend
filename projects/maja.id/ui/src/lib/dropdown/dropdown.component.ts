import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  show = false;
  position: 'left' | 'right' = 'left';
  constructor(private eRef: ElementRef) {}

  ngAfterContentInit() {
    const bounds = this.eRef.nativeElement.getBoundingClientRect();
    const viewPortWidth = window.innerWidth;
    if (bounds.right > (viewPortWidth - 300)) {
      this.position = 'right';
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.show = !this.show;
    } else {
      this.show = false;
    }
  }
}
