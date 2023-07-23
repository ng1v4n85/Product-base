import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  product: Product;
  productForm: FormGroup;
  private productsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      brand: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
    });
    this.route.params.subscribe((params) => {
      const productId = +params['id'];
      this.productsSubscription = this.productService.load().subscribe(
        (products: Product[]) => {
          this.product = products.find((product) => product.id === productId);
          this.populateForm();
        },
        (error: any) => {
          console.error('Error fetching products:', error);
        }
      );
    });
  }

  populateForm() {
    if (this.product) {
      this.productForm.patchValue({
        title: this.product.title,
        description: this.product.description,
        price: this.product.price,
        brand: this.product.brand,
        category: this.product.category,
      });
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const updatedProduct: Partial<Product> = {
        title: this.productForm.value.title,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        brand: this.product.brand,
        category: this.product.category,
      };
      this.productService.update(this.product.id, updatedProduct).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
