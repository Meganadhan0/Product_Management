import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  formType: 'product' | 'accessory' = 'product';
  constructor(private productService:ProductService){}

    newProduct: Product = {model : "",product:"",make :"",accessory :"",cost :"",quantity:""};
    products:Product[] =[];
    editingProduct:Product|null =null;
    updatedProduct:Product = {model : "",product:"",make :"",accessory :"",cost :"",quantity:""};

    ngOnInit(): void {
        this.getAllProducts();
    }
    
    createProduct():void{
    if (this.formType === 'product') {
    } else {(this.formType === 'accessory')}
      this.productService.createProduct(this.newProduct).subscribe((createdProduct)=>{
        this.newProduct = {model : "",product:"",make :"",accessory :"",cost :"",quantity:""};//reset Product
        this.products.push(createdProduct);
      })
    }
    getAllProducts(){
      this.productService.getAllProduct().subscribe((products)=>{
        this.products = products
      })
    }
    editProduct(product:Product){
      this.editingProduct=product;
      this.updatedProduct={...product};//create a copy for editing
    }
    updateProduct():void{
      if(this.editingProduct){
        this.productService.updateProduct(this.editingProduct.id!,this.updatedProduct)
        .subscribe((result)=>{
           const index= this.products.findIndex((product)=> product.id==this.editingProduct!.id)
           if(index!== -1){
            this.products[index]=result;
            //close edit
            this.cancelEdit()
           }
        })
      }
    }
    cancelEdit(){
      this.editingProduct=null;
      this.updatedProduct={model : "",product:"",make :"",accessory :"",cost :"",quantity:""};
    }
    deleteProduct(productId :any){
    if(confirm('Are you Sure to Delete ?'))
        this.productService.deleteProduct(productId)
        .subscribe(()=>{
            this.products = this.products.filter((product)=> product.id !== productId)
            if(this.editingProduct && this.editingProduct.id == productId)
              this.cancelEdit();
          })

    }
}

