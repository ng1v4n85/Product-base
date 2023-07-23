import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  private productsSubscription: Subscription;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.productsSubscription = this.productService.list().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onAddProduct() {
    this.router.navigate(['new']);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}