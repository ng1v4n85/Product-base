import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewProduct } from 'src/app/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  newProduct: NewProduct;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: NewProduct = this.productForm.value;
      this.productService.add(newProduct).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }

}

