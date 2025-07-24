import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {HeaderComponent} from './core-components/header/header.component';
import {ProductsListComponent} from './pages/products-list/products-list.component';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {SidenavComponent} from './core-components/sidenav/sidenav.component';
import {PopupHostComponent} from './core-components/popup-host/popup-host.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, ProductsListComponent, SidenavComponent, PopupHostComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly appConfig = applicationConfigMock;

    readonly isDrawerOpenedStore = signal(false);

    readonly switchTemplate = signal(true);
    readonly closeTemplate = signal(true);

    constructor() {
        setTimeout(() => {
            this.toggleTemplate();
        }, 3000);

        setTimeout(() => {
            this.toggleTemplate();
        }, 6000);

        setTimeout(() => {
            this.toggleTemplate();
        }, 9000);
    }

    onMenuClick() {
        this.isDrawerOpenedStore.update(isOpened => !isOpened);
    }

    toggleTemplate() {
        // this.switchTemplate.set(!this.switchTemplate());
        this.closeTemplate.set(!this.closeTemplate());
    }
}
