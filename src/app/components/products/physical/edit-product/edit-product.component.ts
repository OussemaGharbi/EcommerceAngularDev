import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/service/image.service';
import { Product, ProductService } from 'src/app/shared/service/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

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
  id:string;
  public product:Product
  constructor(private fb: FormBuilder,
    private router: Router,
    private imageService: ImageService,
    private productService: ProductService, private activatedRoute:ActivatedRoute, private sanitizer: DomSanitizer) {
    this.createForm()
  }
  thumbnail
  imagefile
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe({
      next:paramMap=>{
        this.id = paramMap.get('id');
      }
    })
    this.productService.findById(this.id).subscribe(result=>{
      console.log(result);
      let objectURL = 'data:image/jpeg;base64,' + result.img;

         this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      
      this.product=result
      this.imagefile = `${environment.apiUrl}/api/product/documents/${this.product.img}`;

      this.productForm.get('name').setValue(this.product.name);
      this.productForm.get('price').setValue(this.product.price);
      this.productForm.get('code').setValue(this.product.code);
      this.productForm.get('size').setValue(this.product.size);
      this.productForm.get('description').setValue(this.product.description);
      this.productForm.get('qty').setValue(this.product.qty);

    })


    
  }
  
  clickOnImage(item, i) {
    console.log("item : ", item);
    console.log("index : ", i);
  }

  form: FormGroup & Product;
  createForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      price: ['', [Validators.required, Validators.pattern('[1-9][a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      code: ['',],
      size: [''],
      description: [''],
      qty: [1],
    }) as FormGroup & Product;
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

  

  submit() {
    console.log("productForm.invalid :", this.productForm.invalid);
    console.log("productForm :", this.productForm.value);
    var productBody: Partial<Product> = this.productForm.value
    this.productService.editById(this.id,productBody)
      .subscribe(
         (data: any) => {
          console.log('true ', data);
           this.uploadImage(data);
          // this.toasterService.success(DEFAULT_MESSAGES.success.add);
          this.createForm();
          // this.router.navigate(['/products','physical','product-list'])

        }, error => {
          console.error("error :", error);
          // this.toasterService.error(DEFAULT_MESSAGES.error.default);

        })
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
    }else{
      this.router.navigate(['products/physical/product-list']);

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
