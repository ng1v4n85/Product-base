import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';

export const ProductResolver: ResolveFn<any[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  productService: ProductService = inject(ProductService)
): Observable<any[]> => productService.load();
