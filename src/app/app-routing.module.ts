import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { OrderingComponent } from './ordering/ordering.component';
import { ProductsComponent } from './products/products.component';
import { ContantUsComponent } from './contant-us/contant-us.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { SuppliersComponent } from './suppliers/suppliers.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'ordering', component: OrderingComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'contact-us', component: ContantUsComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'suppliers', component: SuppliersComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
