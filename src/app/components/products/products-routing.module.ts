import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { EditProductComponent } from './physical/edit-product/edit-product.component';
import { AuthGuard } from 'src/app/authGuard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGuard],
    children: [
      {
        path: 'physical/category',
        component: CategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'physical/sub-category',
        component: SubCategoryComponent,
        data: {
          title: "Sub Category",
          breadcrumb: "Sub Category"
        }
      },
      {
        path: 'physical/product-list',
        component: ProductListComponent,
        data: {
          title: "Liste Produits",
          breadcrumb: "Liste Produits"
        },
        canActivate:[AuthGuard]
      },
      {
        path: 'physical/product-detail',
        component: ProductDetailComponent,
        data: {
          title: "Product Detail",
          breadcrumb: "Product Detail"
        },
        canActivate:[AuthGuard]
      },
      {
        path: 'physical/add-product',
        component: AddProductComponent,
        data: {
          title: "Ajout Produit",
          breadcrumb: "Ajout Produit"
        },
        canActivate:[AuthGuard]
      },
      {
        path: 'physical/edit-product/:id',
        component: EditProductComponent,
        data: {
          title: "Edit Produit",
          breadcrumb: "Edit Produit"
        },
        canActivate:[AuthGuard]
      },
      {
        path: 'digital/digital-category',
        component: DigitalCategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        },
        canActivate:[AuthGuard]
      },
      {
        path: 'digital/digital-sub-category',
        component: DigitalSubCategoryComponent,
        data: {
          title: "Sub Category",
          breadcrumb: "Sub Category"
        },
        canActivate:[AuthGuard]
      },
      {
        path: 'digital/digital-product-list',
        component: DigitalListComponent,
        data: {
          title: "Product List",
          breadcrumb: "Product List"
        },
        canActivate:[AuthGuard]
      },
      {
        path: 'digital/digital-add-product',
        component: DigitalAddComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        },
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
