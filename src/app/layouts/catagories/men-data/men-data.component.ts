import { Product, ProductResponse } from './../../../Model/products.model';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { CatagoriesComponent } from '../catagories.component';
import { CatagoryService } from '../../../Services/catagory.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../Services/cart.service';
import { ApiProductsService } from '../../../Services/api-products.service';


@Component({
  selector: 'app-men-data',
  standalone: true,
  imports: [HeaderComponent,CommonModule,RouterLink],
  templateUrl: './men-data.component.html',
  styleUrl: './men-data.component.css'
})
export class MenDataComponent implements OnInit {


// catagory:string | null=null

product:any

routee=inject(ActivatedRoute)
constructor(private catService:CatagoryService,

  private cart:CartService,
  private apiProduct:ApiProductsService
){

}

ngOnInit() {
this.viewProduct()
  
  this.routee.params.subscribe({next:params => {
      this.getCata(params['category']);
      }
  });
 
  }


  viewProduct(){
   
   const productId=this.routee.snapshot.paramMap.get('id')

    this.apiProduct.getSingleProduct(productId!).subscribe(res=>{
      console.log(res);
      console.log(productId);
      this.product=res
    })

  }






  getCata(cata:any){
  
    this.catService.getCatagoryProd(cata).subscribe({next:(res)=>{
      console.log(res.products);
      this.product=res.products
    },error:(err)=>{
      console.log(err)
    }})
}

addToCart(){
  this.cart.addToCart(this.product)
  console.log(this.product);
}









}


