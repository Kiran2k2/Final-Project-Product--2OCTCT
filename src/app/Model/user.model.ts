export interface UserList{
    id:number,
    email:string,
    password:string,
    username:string,
    phone:string,
    name:{
        firstname:string,
        lastname:string
    },
    address:{
        city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    }
}
}