import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import feather, { FeatherIconNames } from 'feather-icons';

@Component({
  selector: 'ui-chip',
  standalone: true,
  imports: [],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ChipComponent {
  @Input()
  leadingIcon?: TemplateRef<any> | string | undefined;
  @Input()
  trailingIcon?: TemplateRef<any> | string | undefined;
  @Input()
  title: string = '';
  @Input()
  subtitle: string = '';
  @Output()
  onClick = new EventEmitter();

  @ViewChild('chipLeadingIcon') leadingIconRef?: ElementRef;
  @ViewChild('chipTrailingIcon') trailingIconRef?: ElementRef;

  renderer = inject(Renderer2);

  ngOnChanges() {
    console.debug(this.title);
  }

  additionalClass = '';
  ngAfterViewInit() {
    let additionalClass = '';
    if (this.leadingIcon) {
      additionalClass += ' has-leading-icon ';
    }
    if (this.trailingIcon) {
      additionalClass += ' has-trailing-icon ';
    }
    this.additionalClass = additionalClass;

    if (this.leadingIcon && this.leadingIcon instanceof TemplateRef ) {
      this.leadingIconRef?.nativeElement.appendChild(this.leadingIcon.createEmbeddedView({}).rootNodes[0]);
    }
    if (this.leadingIcon && typeof this.leadingIcon === 'string' ) {
      this.renderer.setProperty(this.leadingIconRef?.nativeElement, 'innerHTML', this.getIcon(this.leadingIcon as string));
    }
    if (this.trailingIcon && this.trailingIcon instanceof TemplateRef ) {
      this.trailingIconRef?.nativeElement.appendChild(this.trailingIcon.createEmbeddedView({}).rootNodes[0]);
    }
    if (this.trailingIcon && typeof this.trailingIcon === 'string' ) {
      this.renderer.setProperty(this.trailingIconRef?.nativeElement, 'innerHTML', this.getIcon(this.trailingIcon as string));
    }
  }

  onClicked(event: any) {
    this.onClick.emit(event);
    event.preventDefault();
  }

  private getIcon(src: string) {
    if (src.includes('http')) {
      return `<img src="${src}" />`;
    } else {
      return feather.icons[src as FeatherIconNames].toSvg();
    }
  }
}
