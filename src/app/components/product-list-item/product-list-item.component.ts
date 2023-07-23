import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent {
  @Input() product: Product;

  constructor(private productService: ProductService, private router: Router) {}

  onDelete() {
    this.productService.delete(this.product.id).subscribe(
      () => {},
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  onViewDetails(productId: number) {
    this.router.navigate([productId]);
  }

  onEdit(productId: number) {
    this.router.navigate(['edit', productId]);
  }
}
