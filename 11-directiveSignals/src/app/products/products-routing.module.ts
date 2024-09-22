import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './components/products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'products', component: ProductsPageComponent },
      { path: '**', redirectTo: 'products' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
