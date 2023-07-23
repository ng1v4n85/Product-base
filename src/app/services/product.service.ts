import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { NewProduct, Product } from '../product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'https://dummyjson.com/products';
  products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private httpClient: HttpClient) {}

  load(): Observable<Product[]> {
    const currentProducts = this.products.getValue();
    if (currentProducts.length) {
      return of(currentProducts);
    }
    return this.httpClient.get(this.url).pipe(
      map((response: {products: Product[] }) => {
        this.products.next(response.products);
        return response.products;
      })
    );
  }

  list(): Observable<Product[]> {
    return this.products.asObservable();
  }

  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  delete(productId: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${productId}`).pipe(
      tap(() => {
        const currentProducts = this.products.getValue();
        const updatedProducts = currentProducts.filter(
          (product) => product.id !== productId);
        this.products.next(updatedProducts);
      })
    );
  }

  update(productId: number, updatedProduct: Partial<Product>): Observable<Product> {
    return this.httpClient.put(`${this.url}/${productId}`, updatedProduct).pipe(
      tap((updatedProduct: Product) => {
        const currentProducts = this.products.getValue();
        const index = currentProducts.findIndex((p) => p.id === productId);
        if (index !== -1) {
          currentProducts[index] = updatedProduct;
          this.products.next(currentProducts);
        }
      })
    );
  }

  add(newProduct: NewProduct): Observable<Product> {
    // Simulacija za id
    const productId = this.products.getValue().length + 1;
    const productWithId: NewProduct = {
      id: productId,
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
      brand: newProduct.brand,
      category: newProduct.category,
    };
    const currentProducts = this.products.getValue();
    currentProducts.push(productWithId as Product);
    this.products.next(currentProducts);
    console.log(productWithId);
    return this.httpClient.post<Product>(`${this.url}/add`, productWithId);
  }
}
