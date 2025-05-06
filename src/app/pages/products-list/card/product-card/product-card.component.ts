import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {Product} from '../../../../shared/products/product.interface';

/** Компонент карточки товара */
@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
    @Input() product?: Product;

    get productImage() {
        return this.product?.images.at(0);
    }

    isActiveStar(index: number): boolean {
        return !!this.product && this.product.rating >= index;
    }
}
