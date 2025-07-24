import {
    ChangeDetectionStrategy,
    Component,
    effect,
    input,
    TemplateRef,
    viewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    standalone: true,
    imports: [],
    templateUrl: './popup-host.component.html',
    styleUrl: './popup-host.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly viewportContainer = viewChild.required('viewport', {read: ViewContainerRef});
    // Шаблон, вставляемый в popup
    readonly template = input<TemplateRef<unknown> | null>();

    constructor() {
        this.updatePopupContent();
    }

    // Обновление контента popup-а на основе пришедшего шаблона
    private updatePopupContent() {
        effect(() => {
            const template = this.template();

            // Если есть контент во вьюпорте - чистим его, чтобы была возможность вставить новый
            this.viewportContainer().clear();

            if (template) {
                this.viewportContainer().createEmbeddedView(template);
            }
        });
    }
}
