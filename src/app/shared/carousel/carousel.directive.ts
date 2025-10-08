import {
    Directive,
    inject,
    signal,
    computed,
    input,
    TemplateRef,
    ViewContainerRef,
    effect,
} from '@angular/core';

interface CarouselContext<Data> {
    $implicit: Data;
    index: number;
    imagesArray: Data[];
    next: () => void;
    back: () => void;
}

@Directive({
    selector: '[appCarousel]',
    standalone: true,
})
export class CarouselDirective<Data> {
    private readonly currentIndex = signal<number>(0);
    private readonly viewContainerRef = inject(ViewContainerRef);
    private readonly templateRef = inject<TemplateRef<CarouselContext<Data>>>(TemplateRef);

    readonly imagesArray = input.required<Data[]>();

    readonly currentItem = computed(() => this.imagesArray()[this.currentIndex()]);

    constructor() {
        this.updateImageTemplate();
    }

    updateImageTemplate() {
        effect(() => {
            this.viewContainerRef.clear();
            const currentItem = this.currentItem();

            this.viewContainerRef.createEmbeddedView(this.templateRef, {
                $implicit: currentItem,
                index: this.currentIndex(),
                imagesArray: this.imagesArray(),
                next: () => this.next(),
                back: () => this.back(),
            });
        });
    }

    next() {
        this.currentIndex.update(currentIndex => {
            if (currentIndex === this.imagesArray().length - 1) {
                return currentIndex;
            }
            return currentIndex + 1;
        });
    }

    back() {
        this.currentIndex.update(currentIndex => {
            if (currentIndex <= 0) {
                return 0;
            }

            return currentIndex - 1;
        });
    }
}
