import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../../Services/api-products.service';
import { Product } from '../../Model/products.model';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  standalone:true,
  imports:[AgGridAngular],
  selector: 'app-product-ag-grid',
  templateUrl: './product-ag-grid.component.html',
  styleUrls: ['./product-ag-grid.component.css']
})
export class ProductAgGridComponent implements OnInit {
  productList: Product[] = [];
  paginationPageSize: number = 10; // Set the number of rows per page

  constructor(private apiProducts: ApiProductsService) {}

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'Product ID' },
    { field: 'title', headerName: 'Product Name' },
    {
      field: 'thumbnail',
      headerName: 'Image',
      cellRenderer: (data: any) => `<img src="${data.value}" style="width: 50px; height: 50px;">`
    },
    { field: 'price', headerName: 'Price' },
    {
      headerName: 'Actions',
      cellRenderer: () => {
        return `
          <button class="btn-edit">Edit</button>
          <button class="btn-delete"><i class="fas fa-trash"></i></button>
        `;
      },
      onCellClicked: (params: any) => this.onActionClick(params) // Handle edit/delete actions
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
  };

  ngOnInit(): void {
    this.onGetProducts();
  }

  // Fetch products from the API
  onGetProducts() {
    this.apiProducts.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Handle actions for edit and delete buttons
  onActionClick(params: any) {
    const product = params.data;
    if (params.event.target.classList.contains('btn-delete')) {
      this.onDeleteRow(product.id);
    } else if (params.event.target.classList.contains('btn-edit')) {
      this.onEditRow(product);
    }
  }

  // Delete a product
  onDeleteRow(productId:any) {
    this.apiProducts.deleteProduct(productId).subscribe(() => {
      this.productList = this.productList.filter(product => product.id !== productId);
    });
  }

  // Edit a product (basic prompt)
  onEditRow(product: Product) {
    const newTitle = prompt('Enter new product name:', product.title);
    const newPrice = prompt('Enter new product price:', product.price.toString());

    if (newTitle !== null && newPrice !== null) {
      product.title = newTitle;
      product.price = parseFloat(newPrice);

      this.apiProducts.updateProduct(product.id, product).subscribe(() => {
        this.productList = this.productList.map(p => (p.id === product.id ? product : p));
      });
    }
  }
}
