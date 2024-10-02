import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserList } from '../../Model/user.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent implements OnInit{
user:any
private route=inject(ActivatedRoute)
private httpC=inject(HttpClient)

ngOnInit(): void {


 const userId=this.route.snapshot.paramMap.get('id');
 this.httpC.get<any>(`https://fakestoreapi.com/users/${userId}`).subscribe(res=>{
  console.log(res);
    this.user=res
 })





}
}
