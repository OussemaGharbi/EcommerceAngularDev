import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/shared/service/image.service';
import { Product, ProductService } from 'src/app/shared/service/product.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;
  urlsInitArray = [
    { img: "assets/images/user.png", },
    // {
    //   img: "assets/images/user.png",
    // },
    // {
    //   img: "assets/images/user.png",
    // },
    // {
    //   img: "assets/images/user.png",
    // },
    // {
    //   img: "assets/images/user.png",
    // }
  ]
  public url = [...this.urlsInitArray];
  mainImage: string = "assets/images/pro3/1.jpg"

  clickOnImage(item, i) {
    console.log("item : ", item);
    console.log("index : ", i);
  }

  form: FormGroup & Product;
  createForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required ]],
      price: ['', [Validators.required]],
      code: ['', [Validators.required]],
      size: ['', [Validators.required]],
      description: [''],
      qty: [1],
    }) as FormGroup & Product;
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private imageService: ImageService,
    private productService: ProductService) {
    this.createForm()
  }

  increment() {
    let x = this.productForm.value.qty 
    x+= 1;

    this.productForm.get('qty').setValue(x)
  }

  decrement() {
   
    let x = this.productForm.value.qty 
    if(x>1){
      x-= 1;

    }

    this.productForm.get('qty').setValue(x)
  }

  //FileUpload
  readUrl(event: any, i) {
    const file = event.target.files[0];
    this.img.push(file);
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    console.log(event.target.files);

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url[i].img = reader.result.toString();
      this.mainImage = reader.result.toString();
    }
  }

  ngOnInit() {
  }

  submit() {
    console.log("productForm.invalid :", this.productForm.invalid);
    console.log("productForm :", this.productForm.value);
    var productBody: Partial<Product> = this.productForm.value
    if(this.productForm.valid){
      this.productService.create(productBody)
      .subscribe(
        (data: any) => {
          console.log('true ', data);
          this.uploadImage(data);
          // this.toasterService.success(DEFAULT_MESSAGES.success.add);
          this.createForm();
          this.router.navigate(['products/physical/product-list'])
        }, error => {
          console.error("error :", error);
          // this.toasterService.error(DEFAULT_MESSAGES.error.default);
        })
    }
   
  }

  img: any[] = [];
  imageError: string = 'No Image Has Been Selected';
  public droppedImage(image: any[]) {
    this.img = image;
    for (const droppedFile of image) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (
            !(
              file.name.endsWith('.png') ||
              file.name.endsWith('.jpg') ||
              file.name.endsWith('.JPG') ||
              file.name.endsWith('.JPEG') ||
              file.name.endsWith('.jpeg')
            )
          ) {
            this.img = [];
            this.imageError = 'Bad Image!';
          } else {
            this.imageError = '';
          }
        });
      }
    }
  }

  uploadImage(data) {
    const id: string = data._id;
    if (this.img && this.img.length) {
      for (const file of this.img) {
        const formData = new FormData();
        formData.append('document', file);
        // this.toasterService.info(DEFAULT_MESSAGES.success.image.loading);
        this.imageService.uploadImage(formData, id, "product").subscribe(
          (res) => {
            // this.toasterService.success(DEFAULT_MESSAGES.success.image.upload);
            console.log("Image Added Successfully");
            this.img = [];
            this.router.navigate(['products/physical/product-list']);
                    },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  }

  reset() {
    this.createForm()
    this.img = [];
    this.mainImage = "assets/images/pro3/1.jpg";
    this.url = [];
    this.url = this.urlsInitArray;
  }

  formIsValid() {
    return this.img && this.img.length && this.productForm.value.name && this.productForm.value.price
  }
}
