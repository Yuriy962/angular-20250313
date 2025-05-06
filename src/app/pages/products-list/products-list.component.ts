import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ProductCardComponent} from './card/product-card/product-card.component';
import {productsMock} from '../../shared/products/products.mock';

/** Компонент списка товаров */
@Component({
    selector: 'app-products-list',
    standalone: true,
    imports: [ProductCardComponent],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    get ProductList() {
        return productsMock;
    }

    get firstProduct() {
        return productsMock[0];
    }
}
