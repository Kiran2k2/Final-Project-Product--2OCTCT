import { Component, inject, OnInit } from '@angular/core';
import { ApiProductsService } from '../../Services/api-products.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "../home/home.component";
import { CatagoriesComponent } from "../catagories/catagories.component";
import {  Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { CartService } from '../../Services/cart.service';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, HeaderComponent, HomeComponent, CatagoriesComponent, RouterLink, FooterComponent, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  
  
  public productList:any[]=[];

   public limit: number = 14; 
   public skip: number = 0; 
   public totalProducts: number = 0;
   

   newAddProduct = {          
    title: '',
    description: '',
    price: 0,
    rating:''
  };

  showAddForm:boolean=false

   constructor(private apiProds:ApiProductsService, private router:Router, private cart:CartService){
   }
  ngOnInit(): void {

    // this.allProductsList()
    this.getMoreProduct()
    console.log(this.allProductsList.length)
    
  }

  allProductsList(){
    this.apiProds.getAllProduct().subscribe({next:(res)=>{
      this.productList=res.products
      console.log(res);

    },error:(err)=>{
      console.log(err);
    }

  })}

  getMoreProduct(){
    this.apiProds.LimitedProduct(this.limit,this.skip).subscribe({next:(res)=>{
      this.productList=[...this.productList,...res.products];
      this.totalProducts=res.total;
      this.skip+=this.limit
    },error:(err)=>{
      console.log(err)
    }})
  }


     openShowAddForm(){
      this.showAddForm=true
     }
     closeShowForm(){
      this.showAddForm=false
     }
  
 toAddMoreData(){
  this.apiProds.addNewProduct(this.newAddProduct).subscribe({next:(res)=>{

    // this.productList=res
    this.productList.push(res)
    console.log("added",res);


    this.showAddForm=false;

    this.allProductsList()


  }, error:(err)=>{console.log(err)}})
 }



  onViewDetails(product: any) {
    this.router.navigate(['/product', product.id]);
  }


  ondeleteProduct(productId:string){
 this.apiProds.deleteProduct(productId).subscribe({next:(res)=>{
  this.productList=this.productList.filter((pro)=>pro.id!==productId)
  alert(`Product${productId} deleted successfully`)
  // console.log("lkjhgf");
 }})

    
  }

  addToCart(product:any){
    this.cart.addToCart(product)
    console.log(product);
    alert(`product added successfully`)
  }




}
