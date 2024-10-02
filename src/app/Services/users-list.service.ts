import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserList } from '../Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  usersUrl="https://fakestoreapi.com/users"

  constructor(private usersHttp:HttpClient) { }

  getUsers(){
    return this.usersHttp.get<any>(this.usersUrl).pipe(map((res:any)=>{
      return res;

    }))

  }
   addUser(user:UserList):Observable<any>{
  return this.usersHttp.post(this.usersUrl,user)


}

  deleteUser(userId:number):Observable<any>{
    return this.usersHttp.delete(`${this.usersUrl}/${userId}`)

  }
}
