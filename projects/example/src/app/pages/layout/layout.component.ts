import { Component } from '@angular/core';
import { LayoutComponent as UILayoutComponent, CardComponent, SidebarComponent } from '@maja.id/ui';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [UILayoutComponent, CardComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  example1 = `
/** component.ts */
import { LayoutComponent, SidebarComponent } from '@maja.id/ui';

/** component.html */
<ui-layout>
  <ui-sidebar>
    <ul>
      <li>
        <a href="#">Home</a>
      </li>
    </ul>
  </ui-sidebar>
  <div class="content">
    <!-- Your content here -->
  </div>
</ui-layout>
  `;
  example2 = `
/** component.ts */
import {
  LayoutComponent,
  SidebarComponent,
  HeaderComponent,
} from '@maja.id/ui';

/** component.html */
<ui-layout>
  <ui-sidebar>
    <ul>
      <li>
        <a href="#">Home</a>
      </li>
    </ul>
  </ui-sidebar>
  <div class="content">
    <ui-header>
      <!-- Header content -->
    </ui-header>
    <div>
      <!-- Your content here -->
    </div>
  </div>
</ui-layout>
  `;
}
