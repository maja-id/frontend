import { Component, inject } from '@angular/core';
import { SidebarModel, SidebarState } from './sidebar.state';

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  public isOpen = true;
  constructor(private sidebarState: SidebarState) {
    this.sidebarState.state$.subscribe((state: SidebarModel) => {
      console.debug('Sidebar is open: %s', state.open);
      this.isOpen = state.open;
    });
  }
}
