import { Component, inject, OnInit } from '@angular/core';
import { UsersListService } from '../../Services/users-list.service';
import { CommonModule } from '@angular/common';
import { UserList } from '../../Model/user.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

userList:UserList[]=[]

  userService=inject(UsersListService);
  router=inject(Router)


ngOnInit(): void {
  this.userService.getUsers().subscribe(res=>{
    this.userList=res
    console.log(res);
  })
}
onViewUser(user:any){
this.router.navigate(['user',user.id])
}

onDeleteUser(userId:number){
  // if(confirm("sure want to delete")){
this.userService.deleteUser(userId).subscribe(()=>{
  this.userList=this.userList.filter((user:any)=>{
    console.log(user);
   return user.id!==userId
    
  })
 
  
})
  // }
  
}


}
