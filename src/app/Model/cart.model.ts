export interface CartItem {
    // product: string;
    name: string;
    price: number;
    quantity: number;
    id: number;
  }
 
 export interface NEWCART {
  name: string;
  price: number;
  quantity: number;
  id: number;

 }
 //======================================= This one for Dummy-JSON-Cart======================
//  export interface CartResponse{
//   limit:number,
//   skip:number,
//   carts:Carts[]
//   total:number
//  }
 export interface Carts{
  id: number;
  products: CartProduct[]; // Array of products in the cart
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;


 }
 export interface CartProduct{
  
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
  }
 
 