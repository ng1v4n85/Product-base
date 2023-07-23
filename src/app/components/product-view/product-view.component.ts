import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {

  product: Product;
  private productsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productsSubscription = this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.productService.list().subscribe(
        (products: Product[]) => {
          this.product = products.find(product => product.id === productId);
        },
        (error: any) => {
          console.error('Error fetching products:', error);
        }
      );
    });
  }

  onDelete(productId: number) {
    this.productService.delete(productId).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

}
