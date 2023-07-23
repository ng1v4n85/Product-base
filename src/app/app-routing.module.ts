import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductResolver } from './resolvers/product.resolver';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

const routes: Routes = [
  
  {
    path: '',
    component: ProductListComponent,
    resolve: { routeResolver: ProductResolver },
  },
  { path: 'new', component: ProductAddComponent },
  { path: ':id', component: ProductViewComponent },
  { path: 'edit/:id', component: ProductEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
