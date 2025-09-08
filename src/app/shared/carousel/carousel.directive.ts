import {Directive} from '@angular/core';

@Directive({
    selector: '[appCarousel]',
    standalone: true,
})
export class CarouselDirective {
    next() {}

    back() {}
}
