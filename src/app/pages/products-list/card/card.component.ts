import {Component, input, output, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {Product} from '../../../shared/products/product.interface';

/** Компонент карточки товара */
@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule, MatBadgeModule],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
})
export class CardComponent {
    basketQuantity = signal(0);

    isFavorite = false;

    readonly product = input.required<Product>();

    readonly buyProduct = output<Product['_id']>();

    get productImage() {
        return this.product().images.at(0);
    }

    isActiveStar(index: number): boolean {
        return this.product().rating >= index;
    }

    addItem(event: Event) {
        event.stopPropagation();
        this.basketQuantity.update(value => value + 1);
        this.buyProduct.emit(this.product()._id);
    }

    removeItem(event: Event) {
        if (this.basketQuantity() === 0) {
            return;
        }

        event.stopPropagation();
        this.basketQuantity.update(value => value - 1);
        this.buyProduct.emit(this.product()._id);
    }

    toFavorite(event: Event) {
        event.stopPropagation();
        this.isFavorite = !this.isFavorite;
    }
}
