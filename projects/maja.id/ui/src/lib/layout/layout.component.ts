import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewRef } from '@angular/core';

@Component({
  selector: 'ui-layout',
  standalone: true,
  imports: [NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  public additionalClass: string = '';

  @ViewChild('majaxLayout') majaxLayout?: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {
      this.init();
    }, 0);
  }

  private init() {
    if (this.majaxLayout) {
      const childNodes = this.majaxLayout.nativeElement.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeName === 'UI-SIDEBAR') {
          this.additionalClass += 'has-sidebar ';
        }
        if (childNodes[i].nodeName === 'UI-FOOTER') {
          this.additionalClass += 'has-footer ';
        }
      }
    }
  }
}
