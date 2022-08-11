import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminLayoutComponent} from "./layout/admin-layout/admin-layout.component";
import {IsAdminGuard} from "./core/guards/is-admin.guard";

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadChildren: ()=> import('./features/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path : 'dashboard',
    component : AdminLayoutComponent,
    canActivate : [IsAdminGuard],
    children : [
      {
       path : '' ,
       loadChildren: ()=> import('./features/dashboard/dashboard.module').then(m=>m.DashboardModule)
      },
      {
        path : 'utilisateurs',
        loadChildren: ()=> import('./features/user/user.module').then(m=>m.UserModule)
      },
      {
        path : 'demandes',
        loadChildren: ()=> import('./features/demandes/demandes.module').then(m=>m.DemandesModule)
      },
      {
        path : 'categories',
        loadChildren: ()=> import('./features/category/category.module').then(m=>m.CategoryModule)
      },
      {
        path : 'sub-categories',
        loadChildren: ()=> import('./features/sub-category/sub-category.module').then(m=>m.SubCategoryModule)
      },
      {
        path : 'creators',
        loadChildren: ()=> import('./features/creator/creator.module').then(m=>m.CreatorModule)
      },
      {
        path : 'retraits',
        loadChildren: ()=> import('./features/retraits/retraits.module').then(m=>m.RetraitsModule)
      },
      {
        path : 'devenir-createurs',
        loadChildren: ()=> import('./features/became-creator/became-creator.module').then(m=>m.BecameCreatorModule)
      },
      {
        path : 'occasions',
        loadChildren: ()=> import('./features/occasion/occasion.module').then(m=>m.OccasionModule)
      },
      {
        path : 'types-occasions',
        loadChildren: ()=> import('./features/type-occasion/type-occasion.module').then(m=>m.TypeOccasionModule)
      },
      {
        path : 'options',
        loadChildren: ()=> import('./features/demand-option/demand-option.module').then(m=>m.DemandOptionModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
