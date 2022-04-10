import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from 'src/app/shared/service/product.service';
import { productDB } from 'src/app/shared/tables/product-list';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public product_list = []

  constructor(private productService: ProductService ) {
   

    // this.product_list = productDB.product;
  }

  dataSource: Product[] = []
  getAll() {
    this.productService.getAll()
      .subscribe((res: [Product]) => {
        console.log("res : ", res)
        if (res && res.length) {
          res.forEach((doc) => {
            if (doc.img) {
              doc.img =
                doc.img === '' || doc.img === null ? '' : `${environment.apiUrl}/api/product/documents/${doc.img}`; // TODO REMOVE LOCALHOST FROM PRODUCTION BUILD
            }
          });
        }
        // this.dataSource = res;
        this.product_list = res;
      }, error => {
        console.error("error : ", error)
      })
  }

  ngOnInit() { 
    this.getAll()
  }
  
  delete(id){
   

    this.productService.delete(id).subscribe(result=>{
      this.product_list.splice( this.product_list.indexOf(result),1)

    }
    )
  }
}

  



