import { Component, Input } from '@angular/core';
import { IProduct } from '../../shared/Models/Product';

@Component({
  selector: 'app-shop-item',
  standalone: false,
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss'
})
export class ShopItemComponent {

  @Input() Product:IProduct
  handleImageError(event: any) {
    const img = event.target;
    img.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.className = 'thumbnail-placeholder';
    placeholder.innerHTML = '<i class="fas fa-image"></i>';
    img.parentNode.appendChild(placeholder);
}
}
