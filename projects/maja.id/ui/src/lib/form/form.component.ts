import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormOptions } from './form.options';
import { NgStyle } from '@angular/common';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'ui-form',
  standalone: true,
  imports: [NgStyle, FormInputComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  _data: any = {};
  ngOnChanges(): void {
    for (const option of this.options) {
      if (option.type === 'group') {
        for (const child of option.childrens || []) {
          if (child.type !== 'title') {
            this._data[child.name] =
              child.defaultValue || (child.type == 'search' ? [] : '');
          }
        }
      } else {
        if (option.type !== 'title') {
          this._data[option.name] =
            option.defaultValue || (option.type == 'search' ? [] : '');
        }
      }
    }
  }
  @Input()
  options: FormOptions[] = [];

  @Input()
  data: any = {};

  @Output()
  changed: EventEmitter<any> = new EventEmitter<any>();

  _onInputChange(data: any) {
    this._data = { ...this._data, ...data };
    //console.log(this._data);
    this.changed.emit(this._data);
  }

  getGridStyle(option: FormOptions) {
    const styles: any = {};
    if (option.type == 'group') {
      styles.display = 'grid';
      styles.gap = '2rem';
      styles.gridTemplateColumns = `repeat(${option.childrens?.length || 1}, 1fr)`;
    }
    return styles;
  }
}
