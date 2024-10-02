import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './layouts/products/products.component';
// import { LayoutsComponent } from './layouts/layouts.component';
import { ProductComponent } from './layouts/product/product.component';
import { CartComponent } from './layouts/cart/cart.component';
import { CatagoriesComponent } from './layouts/catagories/catagories.component';
import { MenDataComponent } from './layouts/catagories/men-data/men-data.component';
import { ElectronicsComponent } from './layouts/catagories/electronics/electronics.component';

import { SingleUserComponent } from './layouts/single-user/single-user.component';
import { SignupComponent } from './Components/signup/signup.component';

import { SearchProductComponent } from './layouts/search-product/search-product.component';
import { ProductAgGridComponent } from './layouts/product-ag-grid/product-ag-grid.component';
import { AllCartProductsComponent } from './layouts/all-cart-products/all-cart-products.component';
import { SingleCartComponent } from './layouts/all-cart-products/single-cart/single-cart.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [{
    path:'',
    redirectTo:"login",
    pathMatch:'full'
},
{
    path:'login',
    component:LoginComponent
},
{
    path:'products',
    component:ProductsComponent



 },
 {
    path:'product/:id',
    component:ProductComponent
 },
 {
   path:'cartList',
   component:CartComponent,
   canActivate:[authGuard]
 },
{

path:'allCartList',
component:AllCartProductsComponent,
// canActivate:[authGuard]

 },
 {
   path:"allCartList/:id", component:SingleCartComponent,
   // canActivate:[authGuard]

    
 },
 
 
 
 {
   path:"productss/:category",
   component:MenDataComponent
 },{
  path:'productts/search',component:SearchProductComponent
 },
{
   path:'users-list',
   component:ProductAgGridComponent
},
{
   path:'user/:id',
   component:SingleUserComponent

},

{
   path:'**',
   component:ElectronicsComponent
}

];
