import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  LayoutComponent,
  FormComponent,
  SidebarComponent,
  HeaderComponent,
  ButtonComponent,
  FormOptions,
  MenuComponent,
  SidebarService,
} from '@maja.id/ui';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    NgIconComponent,
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    ButtonComponent,
    FormComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private sidebarService = inject(SidebarService);
  title = 'example';
  searchFormOptions: FormOptions[] = [
    {
      name: 'keyword',
      type: 'text',
      leadingIcon: 'search',
      placeholder: 'Search',
    },
  ];

  toggleSidebar() {
    this.sidebarService.toggle();
  }
}
