import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent, FormComponent, SidebarComponent, FooterComponent, HeaderComponent, AvatarComponent, ButtonComponent, DropdownComponent, FormOptions, MenuComponent } from '@maja.id/ui';
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
    FormComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'example';
  searchFormOptions: FormOptions[] = [
    {
      name: 'keyword',
      type: 'text',
      leadingIcon: 'search',
      placeholder: 'Search',
    }
  ];
  formOptions: FormOptions[] = [
    {
      label: 'Username',
      name: 'tes',
      type: 'search',
      hint: 'Search for user',
        trailingIcon: 'search',
      api: {
        url: 'https://api.github.com/users',
        valueField: 'id',
        labelField: 'login',
        descriptionField: 'type',
        iconField: 'avatar_url',
        searchKey: 'userame',
      }
    },
    {
      label: 'Tanggal lahir',
      name: 'date',
      type: 'date',
    }
  ];
  onChanged = (event: any) => {
    console.debug(event);
  }
}
