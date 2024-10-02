import { Component, NgModule } from '@angular/core';
import { UsersListService } from '../../Services/users-list.service';
import { UserList } from '../../Model/user.model';
import { CommonModule } from '@angular/common';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

user:UserList={
  id:0,
  email:'',
  password:'',
  username:'',
  phone:'',
  name:{
    firstname:'',
    lastname:'',
  },
  address:{
    city: '',
    street: '',
    number: 0,
    zipcode: '',
    geolocation: {
      lat: '',
      long: ''
    }
  }

}
constructor(private userService:UsersListService,){}





  createUser(){

   
    
      this.userService.addUser(this.user).subscribe({next:(res)=>{
        alert(" User created successfully")
        console.log("response",res);

      },error:(error)=>{
        console.log("error happen",error);
      },complete:()=>{
        console.log("completed");
      }
    
    
    })
    
  }

  }










