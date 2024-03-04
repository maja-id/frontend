import { Injectable, inject } from "@angular/core";
import { SidebarState } from "./sidebar.state";

@Injectable({ providedIn: 'root' })
export class SidebarService {
  sidebarState = inject(SidebarState);

  toggle() {
    this.sidebarState.toggle();
  }
}
