import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { FormOptions } from '../form/form.options';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneCdkModule } from '@ngx-dropzone/cdk';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from '../avatar/avatar.component';
import feather, { FeatherIconNames } from 'feather-icons';

@Component({
  selector: 'ui-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css'],
  imports: [
    NgClass,
    NgStyle,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    DropzoneCdkModule,
    AvatarComponent,
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None
})
export class FormInputComponent {
  httpClient = inject(HttpClient);
  renderer = inject(Renderer2);
  isError = false;
  searchFocused = false;
  _data: any = {};
  errorText = 'Required field';
  textType = ['text', 'number', 'email', 'password'];

  @ViewChild('searchInput') searchRef?: ElementRef;
  @ViewChild('leadingIcon') leadingIconRef?: ElementRef;
  @ViewChild('trailingIcon') trailingIconRef?: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.searchRef?.nativeElement.contains(event.target)) {
      this.searchFocused = !this.searchFocused;
    } else {
      this.searchFocused = false;
    }
  }

  ngOnInit(): void {
    if (this.options.type != 'title') {
      this._data[this.options.name] = this.defaultValue;
    }
    if (!this.options.className) {
      this.options.className = '';
    }
    if (this.options.type === 'select') {
      this.selectModel = this.options.defaultValue || undefined;
    }
    if (this.options.type === 'search') {
      this.selectedSearchResult = this.options.defaultValue || [];
      this._onSearch({ target: { value: '' } });
    }
    if (this.options.defaultValue) {
      if (
        this.options.type === 'search' &&
        !this.options.enableRoleInSearchResult
      ) {
        const _selectedValue = [];
        for (const v in this.options.defaultValue) {
          _selectedValue.push(this.options.defaultValue[v].value);
        }
        this._data[this.options.name] = _selectedValue;
      } else {
        this._data[this.options.name] = this.options.defaultValue;
      }
    }
    this.changed.emit(this._data);
    this._validate();

  }

  ngAfterViewInit() {
    if (this.options.leadingIcon) {
      const icon: any = feather.icons[this.options.leadingIcon as FeatherIconNames].toSvg();
      console.log(icon);
      console.log(this.leadingIconRef);
      this.renderer.setProperty(this.leadingIconRef?.nativeElement, 'innerHTML', icon);
    }
    if (this.options.trailingIcon) {
      const icon: any = feather.icons[this.options.trailingIcon as FeatherIconNames].toSvg();
      this.renderer.setProperty(this.trailingIconRef?.nativeElement, 'innerHTML', icon);
    }
  }

  @Input()
  options: FormOptions = { type: 'text', name: '', className: '' };

  @Input()
  defaultValue: any = '';

  @Output()
  changed: EventEmitter<any> = new EventEmitter<any>();

  _validate() {
    if (this.options.required && !this._data[this.options.name]) {
      this.isError = true;
    } else {
      this.isError = false;
    }
  }

  _onChange(event: any) {
    this._data[this.options.name] = event.target.value;
    this.changed.emit(this._data);
    this._validate();
  }

  _onDateTimeChange(event: any) {
    this._data[this.options.name] = event.value;
    this.changed.emit(this._data);
    this._validate();
  }

  _checkboxMultipleValue: any[] = [];
  _onCheckboxChange(event: any) {
    if (this.options.multiple) {
      if (
        event.target.checked &&
        !this._checkboxMultipleValue.includes(event.target.value)
      ) {
        this._checkboxMultipleValue.push(event.target.value);
      } else {
        this._checkboxMultipleValue = this._checkboxMultipleValue.filter(
          (value) => value !== event.target.value,
        );
      }
      this._data[this.options.name] = this._checkboxMultipleValue;
      this.changed.emit(this._data);
      this._validate();
    } else {
      this._data[this.options.name] = event.target.checked
        ? event.target.value
        : '';
      this.changed.emit(this._data);
      this._validate();
    }
  }

  selectModel: any = '';
  _onSelectChange(event: any) {
    this._data[this.options.name] = event;
    this.changed.emit(this._data);
    this._validate();
  }

  _onUpload(event: any) {
    /**
    if (this.options.api && this.options.api.url) {}
    */
    this._data[this.options.name] = [
      ...this._data[this.options.name],
      ...event,
    ];
    this.changed.emit(this._data);
    this._validate();
  }

  file: any;
  get uploadedFiles() {
    return this._data[this.options.name] || [];
  }

  _onRemoveFile(idx: number) {
    this._data[this.options.name].splice(idx, 1);
    this.changed.emit(this._data);
    this._validate();
  }

  searchResults: any[] = [];
  _onSearch(event: any) {
    const { api } = this.options;
    if (api && api.url) {
      const params: any = {};
      const searchKey = api.searchKey || 'keyword';
      const method = api.method || 'GET';
      params[searchKey] = event.target.value;

      this.httpClient
        .request(method, api.url, { params })
        .subscribe((res: any) => {
          const data = res.data || res;
          this.searchResults = data
            ? data
                .filter((item: any) => item.active !== null) // Always ignore inactive items
                .map((item: any) => ({
                  label: api.labelField
                    ? item[api.labelField]
                    : 'ERROR - No Label',
                  value: api.valueField
                    ? item[api.valueField]
                    : item['id'] || '',
                  description: api.descriptionField
                    ? item[api.descriptionField]
                    : '',
                  icon: api.iconField ? item[api.iconField] : '',
                }))
            : [];
        });
    }
  }

  get containerClass() {
    let additionalClass = '';
    if (this.options.leadingIcon) {
      additionalClass = 'input-has-leading-icon ';
    }
    if (this.options.trailingIcon) {
      additionalClass = 'input-has-trailing-icon ';
    }
    return additionalClass;
  }

  selectedSearchResult: any[] = [];
  roles: any[] = [
    { label: 'Read', value: 'read' },
    { label: 'Write', value: 'write' },
  ];
  _onSelectSearchResult(item: any) {
    const _selectedSearchResult: any[] = [...this.selectedSearchResult];
    let isExist = false;
    //const _selectedValue: any[] = [];
    this.selectedSearchResult.forEach((element) => {
      if (element.value === item.value) {
        isExist = true;
      }
    });
    if (!isExist) {
      _selectedSearchResult.push({
        ...item,
        role: '',
      });
      if (this.options.enableRoleInSearchResult) {
        this._data[this.options.name].push({ value: item.value, role: '' });
      } else {
        if (!this._data[this.options.name]) {
          this._data[this.options.name] = [];
        }
        this._data[this.options.name].push(item.value);
      }
    }
    this.selectedSearchResult = _selectedSearchResult;
    //this._data[this.options.name] = _selectedValue;
    this.changed.emit(this._data);
    this._validate();
  }

  _onRemoveSearchResult(idx: number) {
    const _selectedItem = this.selectedSearchResult[idx];
    let _valueIdx;
    if (this.options.enableRoleInSearchResult) {
      for (const v in this._data[this.options.name]) {
        if (this._data[this.options.name][v].value === _selectedItem.value) {
          _valueIdx = v;
        }
      }
    } else {
      _valueIdx = this._data[this.options.name].indexOf(_selectedItem.value);
    }
    this.selectedSearchResult.splice(idx, 1);
    this._data[this.options.name].splice(_valueIdx, 1);
    this.changed.emit(this._data);
    this._validate();
  }

  _onRoleChange(dt: any, idx: number) {
    this.changed.emit(this._data);
    this._validate();
  }

  getFileIcon(type: string) {
    if (type.includes('image')) {
      return 'image';
    }

    return 'note';
  }
}
