import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent, SidebarComponent, FooterComponent, HeaderComponent, AvatarComponent, ButtonComponent, DropdownComponent } from '@maja.id/ui';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgIconComponent,
    LayoutComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    AvatarComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'example';
}
