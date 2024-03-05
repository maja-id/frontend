import { Directive, ElementRef, Renderer2 } from "@angular/core";

@Directive({
  selector: "[popover]",
  standalone: true,
})
export class PopoverDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
}
