import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  imports: [NgOptimizedImage, NgClass],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  @Input() size: 'md' | 'sm' | 'lg' | 'xl' = 'md';
  @Input() alt: string = '';
  @Input() src: string = 'https://i.pravatar.cc/300';
  @Input() bgColor: string = '';

  customStyle: any = {};

  ngAfterViewInit() {
    this.generateBgColor();
  }

  generateBgColor() {
    setTimeout(() => {
      if (this.bgColor) {
        this.customStyle = {
          'background-color': this.bgColor
        };
      }
    }, 0);
  }
}
