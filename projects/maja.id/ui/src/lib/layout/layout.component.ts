import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  ViewRef,
  inject,
} from '@angular/core';
import { SidebarModel, SidebarState } from '../sidebar/sidebar.state';

@Component({
  selector: 'ui-layout',
  standalone: true,
  imports: [NgClass],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  public additionalClass: string = '';
  private hasSidebar = false;

  @ViewChild('majaxLayout') majaxLayout?: ElementRef;

  constructor(private sidebarState: SidebarState) {
    this.sidebarState.state$.subscribe((state: SidebarModel) => {
      if (!state.open) {
        this.additionalClass = this.additionalClass.replace('has-sidebar', '');
      } else {
        if (
          this.hasSidebar &&
          this.additionalClass.indexOf('has-sidebar') === -1
        ) {
          this.additionalClass += 'has-sidebar ';
        }
      }
    });
  }

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
          this.hasSidebar = true;
        }
        if (childNodes[i].nodeName === 'UI-FOOTER') {
          this.additionalClass += 'has-footer ';
        }
      }
    }
  }
}
